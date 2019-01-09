export { ICartoAPIResponse, IEALGISApiClient, IHttpResponse } from "../../shared/api/EALGISApiClient"
export { IGoogleAddressSearchResult, IGoogleGeocodeResult } from "../../shared/ui/GooglePlacesAutocomplete/GooglePlacesAutocomplete"
export { eAppEnv, ePollingPlaceFinderInit, IModule as IAppModule } from "./app"
export { IElection, IModule as IElectionsModule } from "./elections"
export {
    IMapPollingPlace,
    IModule as IPollingPlacesModule,
    IPollingPlace,
    IPollingPlaceLoaderResponse,
    IPollingPlaceLoaderResponseMessage,
    IPollingPlaceSearchResult,
} from "./polling_places"
export { IStore } from "./reducer"
export { IModule as ISnackbarsModule } from "./snackbars"
export { IModule as IStallModule, IStall, IStallLocationInfo, IStallPollingPlacInfo, StallStatus } from "./stalls"

export interface IEnvVars {
    NODE_ENV: string // development, test, production
    REACT_APP_SITE_BASE_URL: string
    REACT_APP_API_BASE_URL: string
    REACT_APP_GOOGLE_MAPS_API_KEY: string
    REACT_APP_GOOGLE_ANALYTICS_UA: string
    REACT_APP_MAPBOX_API_KEY_DEV: string
    REACT_APP_MAPBOX_API_KEY_PROD: string
    REACT_APP_RAVEN_URL: string
}

export interface IConfig {
    GOOGLE_ANALYTICS_UA: string
    GOOGLE_MAPS_API_KEY: string
    MAPBOX_API_KEY: string
    RAVEN_URL: string
}

/* Material UI muiThemeable palette object */
export interface IMUIThemePalette extends __MaterialUI.Styles.ThemePalette {}

export interface IMUITheme {
    palette: IMUIThemePalette
}

export interface IMUIThemeProps {
    muiTheme: IMUITheme
}
