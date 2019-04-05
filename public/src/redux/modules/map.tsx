import * as dotProp from "dot-prop-immutable"
import * as ol from "openlayers"
import { IMapPollingGeoJSONNoms, IMapPollingPlaceFeature } from "./polling_places"
// import { IAnalyticsMeta } from "../../shared/analytics/GoogleAnalytics"

// Actions
const SEARCH_MAP = "ealgis/map/SEARCH_MAP"
const CLEAR_MAP_SEARCH = "ealgis/map/CLEAR_MAP_SEARCH"

export enum MapMode {
    SHOW_ELECTION = 0,
    SHOW_SEARCH_RESULTS = 1,
}

const initialState: Partial<IModule> = {
    mode: MapMode.SHOW_ELECTION,
    search: null,
}

// Reducer
export default function reducer(state: Partial<IModule> = initialState, action: IAction) {
    switch (action.type) {
        case SEARCH_MAP:
            state = dotProp.set(state, "mode", MapMode.SHOW_SEARCH_RESULTS)
            return dotProp.set(state, "search", action.searchParams)
        case CLEAR_MAP_SEARCH:
            state = dotProp.set(state, "mode", MapMode.SHOW_ELECTION)
            return dotProp.set(state, "search", null)
        default:
            return state
    }
}

// Action Creators

export function setMapToSearch(searchParams: IMapSearchResults) {
    return {
        type: SEARCH_MAP,
        searchParams,
    }
}
export function clearMapToSearch() {
    return {
        type: CLEAR_MAP_SEARCH,
    }
}

// Models
export interface IModule {
    mode: MapMode
    search: IMapSearchResults | null
}

export interface IMapSearchResults {
    lon: number
    lat: number
    formattedAddress: string
}

export interface IAction {
    type: string
    searchParams?: IMapSearchResults
    meta?: {
        // analytics: IAnalyticsMeta
    }
}

// Side effects, only as applicable
// e.g. thunks, epics, et cetera

// Utilities

const spriteCake = new ol.style.Style({
    image: new ol.style.Icon({
        offset: [0, 0],
        size: [32, 32],
        src: "./icons/sprite_v2.png",
    }),
    zIndex: 1,
})
const spriteBBQCakeRunOut = new ol.style.Style({
    image: new ol.style.Icon({
        offset: [0, 32],
        size: [32, 29],
        src: "./icons/sprite_v2.png",
    }),
    zIndex: 1,
})
const spriteBBQCake = new ol.style.Style({
    image: new ol.style.Icon({
        offset: [0, 61],
        size: [32, 29],
        src: "./icons/sprite_v2.png",
    }),
    zIndex: 1,
})
const spriteBBQ = new ol.style.Style({
    image: new ol.style.Icon({
        offset: [0, 90],
        size: [32, 32],
        src: "./icons/sprite_v2.png",
    }),
    zIndex: 1,
})
const spriteNowt = new ol.style.Style({
    image: new ol.style.Icon({
        offset: [0, 122],
        size: [24, 24],
        src: "./icons/sprite_v2.png",
    }),
    zIndex: 1,
})
const spriteUnknown = new ol.style.Style({
    image: new ol.style.Icon({
        offset: [0, 146],
        size: [14, 14],
        src: "./icons/sprite_v2.png",
        opacity: 0.4,
    }),
    zIndex: 0,
})

export const styleFunctionSprite = function(feature: IMapPollingPlaceFeature) {
    const noms: IMapPollingGeoJSONNoms = feature.get("noms")

    if (noms !== null) {
        if (noms.bbq === true && noms.cake === true) {
            return spriteBBQCake
        } else if ((noms.bbq === true || noms.cake === true) && noms.run_out === true) {
            return spriteBBQCakeRunOut
        } else if (noms.bbq === true) {
            return spriteBBQ
        } else if (noms.cake === true) {
            return spriteCake
        } else if (noms.nothing === true) {
            return spriteNowt
        } else if (noms.bbq === false && noms.cake === false && noms.other === true) {
            return spriteBBQ
        }
    }

    return spriteUnknown
}
