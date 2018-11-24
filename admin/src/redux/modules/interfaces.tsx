export { ICartoAPIResponse, IEALGISApiClient, IHttpResponse } from "../../shared/api/EALGISApiClient"
export { eAppEnv, IModule as IAppModule } from "./app"
export { IElection, IElectionStats, IModule as IElectionsModule } from "./elections"
export {
    IMapPollingPlace,
    IModule as IPollingPlacesModule,
    IPollingPlace,
    IPollingPlaceLoaderResponse,
    IPollingPlaceLoaderResponseMessage,
    PollingPlaceLoaderResponseMessageStatus,
} from "./polling_places"
export { IStore } from "./reducer"
export { IModule as ISnackbarsModule } from "./snackbars"
export { IModule as IStallModule, IStall, IStallLocationInfo, IStallPollingPlacInfo, StallStatus } from "./stalls"
export { IModule as IUserModule, ISelf, IUser } from "./user"

export interface IEnvVars {
    NODE_ENV: string // development, test, production
    REACT_APP_GOOGLE_MAPS_API_KEY: string
    REACT_APP_GOOGLE_ANALYTICS_UA: string
    REACT_APP_CARTO_DB_API_KEY: string
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
