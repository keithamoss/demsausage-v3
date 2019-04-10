import * as ol from "openlayers"
import "openlayers/css/ol.css"
import * as React from "react"
import { getAPIBaseURL } from "../../redux/modules/app"
import { IElection } from "../../redux/modules/elections"
import { IMapFilterOptions, IMapSearchResults, olStyleFunction } from "../../redux/modules/map"
import { IMapPollingPlaceFeature } from "../../redux/modules/polling_places"
import { gaTrack } from "../../shared/analytics/GoogleAnalytics"

export interface IProps {
    election: IElection
    mapSearchResults: IMapSearchResults | null
    mapFilterOptions: IMapFilterOptions
    onQueryMap: Function
}

class OpenLayersMap extends React.PureComponent<IProps, {}> {
    private map: ol.Map | null

    constructor(props: IProps) {
        super(props)

        this.map = null
    }

    componentDidMount() {
        const { election, mapSearchResults, onQueryMap } = this.props

        this.map = new ol.Map({
            renderer: ["canvas"],
            layers: this.getBasemap(),
            target: "openlayers-map",
            controls: [
                new ol.control.Attribution({
                    collapsible: false,
                }),
            ],
            view: new ol.View({
                center: ol.proj.transform(election.geom.coordinates, "EPSG:4326", "EPSG:3857"),
                zoom: election.default_zoom_level,
            }),
        })

        // Account for the ElectionAppBar potentially being added/removed and changing the size of our map div
        window.setTimeout(
            (map: ol.Map) => {
                map.updateSize()
            },
            1,
            this.map
        )

        this.map.addLayer(this.getMapDataVectorLayer(this.map))

        if (mapSearchResults !== null) {
            const layer = this.getSearchResultsVectorLayer(this.map)
            if (layer !== null) {
                this.map.addLayer(layer)
            }
        }

        const map = this.map
        this.map.on("singleclick", function(e: any) {
            gaTrack.event({
                category: "OpenLayersMap",
                action: "Query Features",
            })

            let features: Array<any> = []
            map.forEachFeatureAtPixel(
                e.pixel,
                (feature: any, layer: any) => {
                    features.push(feature)
                },
                {
                    hitTolerance: 3,
                    layerFilter: (layer: ol.layer.Base) => {
                        const props = layer.getProperties()
                        if ("isSausageLayer" in props && props.isSausageLayer === true) {
                            return true
                        }
                        return false
                    },
                }
            )

            gaTrack.event({
                category: "OpenLayersMap",
                action: "Query Features",
                label: "Number of Features",
                value: features.length,
            })

            if (features.length > 0) {
                // SausageMap.queriedPollingPlaces displays a "Too many polling places - try to zoom/find" if we have more than 20
                onQueryMap(features.slice(0, 21))
            }
        })
    }

    componentDidUpdate(prevProps: IProps) {
        if (this.map !== null && prevProps.mapSearchResults !== this.props.mapSearchResults) {
            const { mapSearchResults } = this.props

            // Show the user where their searched/geolocation is using a custom vector layer
            const searchResultsVectorLayer = this.getLayerByProperties(this.map, "isSearchResultsLayer", true)
            if (searchResultsVectorLayer !== null) {
                this.map.removeLayer(searchResultsVectorLayer)
            }

            const searchResultsVectorLayerNew = this.getSearchResultsVectorLayer(this.map)
            if (searchResultsVectorLayerNew !== null) {
                this.map.addLayer(searchResultsVectorLayerNew)
            }

            // Zoom the user down to the bounding box of the polling places that are near their search area
            if (mapSearchResults !== null) {
                this.zoomMapToSearchResults(this.map)
            }
        } else if (this.map !== null && JSON.stringify(prevProps.mapFilterOptions) !== JSON.stringify(this.props.mapFilterOptions)) {
            const sausageLayer = this.getLayerByProperties(this.map, "isSausageLayer", true)
            if (sausageLayer !== null) {
                // @ts-ignore
                sausageLayer.setStyle((feature: IMapPollingPlaceFeature, resolution: number) =>
                    olStyleFunction(feature, resolution, this.props.mapFilterOptions)
                )
            }
        }
    }

    render() {
        return <div id="openlayers-map" className="openlayers-map" />
    }

    private getMapDataVectorLayer(map: ol.Map) {
        const { election, mapSearchResults, mapFilterOptions } = this.props

        const vectorSource = new ol.source.Vector({
            url: `${getAPIBaseURL()}/0.1/map/?election_id=${election.id}&s=${Date.now()}`,
            format: new ol.format.GeoJSON(),
        })

        // @TODO Hacky fix for the GeoJSON loading, but not rendering until the user interacts with the map
        const that = this
        vectorSource.on("change", function(e: any) {
            if (vectorSource.getState() === "ready") {
                window.setTimeout(function() {
                    map.getView().changed()
                    let view = map.getView()

                    if (mapSearchResults !== null) {
                        that.zoomMapToSearchResults(map)
                    } else {
                        let centre = view.getCenter()
                        centre[0] -= 1
                        view.setCenter(centre)
                    }

                    map.setView(view)
                }, 500)
            }
        })

        const styleFunction = (feature: IMapPollingPlaceFeature, resolution: number) =>
            olStyleFunction(feature, resolution, mapFilterOptions)

        const vectorLayer = new ol.layer.Vector({
            renderMode: "image",
            source: vectorSource,
            style: styleFunction,
        } as any)

        vectorLayer.setProperties({ isSausageLayer: true })

        return vectorLayer
    }

    private getLayerByProperties(map: ol.Map, propName: string, propValue: any): ol.layer.Vector | null {
        let layer = null
        map.getLayers().forEach((l: ol.layer.Base) => {
            const props = l.getProperties()
            if (propName in props && props[propName] === propValue) {
                layer = l
            }
        })
        return layer
    }

    private getSearchResultsVectorLayer(map: ol.Map) {
        const { mapSearchResults } = this.props

        if (mapSearchResults !== null) {
            const iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([mapSearchResults.lon, mapSearchResults.lat], "EPSG:4326", "EPSG:3857")),
            })

            iconFeature.setStyle(
                new ol.style.Style({
                    image: new ol.style.RegularShape({
                        fill: new ol.style.Fill({ color: "#6740b4" }),
                        stroke: new ol.style.Stroke({ color: "black", width: 2 }),
                        points: 5,
                        radius: 10,
                        radius2: 4,
                        angle: 0,
                    }),
                })
            )

            const vectorLayer = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: [iconFeature],
                }),
            })

            vectorLayer.setProperties({ isSearchResultsLayer: true })

            return vectorLayer
        }
        return null
    }

    private zoomMapToSearchResults(map: ol.Map) {
        const { mapSearchResults } = this.props

        if (mapSearchResults !== null && mapSearchResults.extent !== null) {
            let view = map.getView()
            view.fit(ol.proj.transformExtent(mapSearchResults.extent, "EPSG:4326", "EPSG:3857"), {
                size: map.getSize(),
                duration: 750,
                padding: [85, 0, 20, 0],
                callback: (completed: boolean) => {
                    if (completed === true) {
                        let centre = view.getCenter()
                        centre[0] -= 1
                        view.setCenter(centre)
                    }
                },
            })
        }
    }

    private getBasemap() {
        gaTrack.event({
            category: "OpenLayersMap",
            action: "Basemap Shown",
            label: "Carto",
        })

        return [
            new ol.layer.Tile({
                source: new ol.source.OSM({
                    // https://carto.com/location-data-services/basemaps/
                    url: "https://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
                    attributions: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.`,
                }),
            }),
        ]
    }
}

export default OpenLayersMap
