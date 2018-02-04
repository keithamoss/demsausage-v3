import * as React from "react"
// import styled from "styled-components"
import {
    // deepPurple900,
    // deepPurple800,
    // deepPurple700,
    // deepPurple600,
    deepPurple500,
    deepPurple400,
    deepPurple300,
    // deepPurple200,
    deepPurple100,
    white,
    fullBlack,
    yellow500,
} from "material-ui/styles/colors"
import { fade } from "material-ui/utils/colorManipulator"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import getMuiTheme from "material-ui/styles/getMuiTheme"

import App from "./App"
import { connect } from "react-redux"
import { fetchInitialAppState, toggleSidebarState } from "./redux/modules/app"
import { iterate as iterateSnackbar } from "./redux/modules/snackbars"

// import CircularProgress from "material-ui/CircularProgress"
import LinearProgress from "material-ui/LinearProgress"

import { setCurrentElection, IElection } from "./redux/modules/elections"
import { IStore, IAppModule, ISnackbarsModule, IElections } from "./redux/modules/interfaces"
// const Config: IConfig = require("Config") as any

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: deepPurple500, // AppBar and Tabs, Buttons, Active textfield et cetera
        primary2Color: deepPurple400, // Used for the selected date in DatePicker
        primary3Color: deepPurple100, // Switch background
        accent1Color: deepPurple500, // Active tab highlight colour
        accent2Color: deepPurple400, // Toolbars and switch buttons
        accent3Color: deepPurple300, // Our app LinearProgress bar and Tabs
        textColor: fullBlack,
        alternateTextColor: white, // Buttons and Tabs
        canvasColor: white,
        borderColor: deepPurple100, // Unselected textfield, Divider, et cetera fields
        disabledColor: fade(fullBlack, 0.5), // Unselected textfield et cetera label colour
        pickerHeaderColor: deepPurple300, // Used for DatePicker
        clockCircleColor: fade(yellow500, 0.07), // Unused
        shadowColor: fullBlack,
    },
    appBar: {
        height: 50,
    },
})

export interface IStoreProps {
    // From Props
    app: IAppModule
    snackbars: ISnackbarsModule
    elections: IElections
    currentElection: IElection
}

export interface IDispatchProps {
    fetchInitialAppState: Function
    handleSnackbarClose: Function
    toggleSidebar: Function
    onChangeElection: Function
}

export interface IStateProps {}

export interface IRouteProps {
    content: any
    location: any
}

export class AppContainer extends React.Component<IStoreProps & IDispatchProps & IRouteProps, IStateProps> {
    constructor(props: IStoreProps & IDispatchProps & IRouteProps) {
        super(props)
    }

    componentDidMount() {
        const { fetchInitialAppState } = this.props
        fetchInitialAppState()
    }

    render() {
        const {
            app,
            snackbars,
            elections,
            currentElection,
            handleSnackbarClose,
            toggleSidebar,
            onChangeElection,
            children,
            content,
        } = this.props

        if (app.loading === true) {
            return (
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div style={{ backgroundColor: muiTheme.palette!.primary1Color, width: "100%", height: "100%" }}>
                        <LinearProgress mode="indeterminate" color={muiTheme.palette!.accent3Color} />
                    </div>
                </MuiThemeProvider>
            )
        }

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <App
                    muiThemePalette={!muiTheme.palette}
                    app={app}
                    snackbars={snackbars}
                    elections={elections}
                    currentElection={currentElection}
                    handleSnackbarClose={handleSnackbarClose}
                    toggleSidebar={toggleSidebar}
                    onChangeElection={onChangeElection}
                    children={children}
                    content={content}
                />
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = (state: IStore): IStoreProps => {
    const { app, snackbars, elections } = state

    return {
        app: app,
        snackbars: snackbars,
        elections: elections.elections,
        currentElection: elections.elections[elections.current_election_id],
    }
}

const mapDispatchToProps = (dispatch: Function): IDispatchProps => {
    return {
        fetchInitialAppState: () => {
            dispatch(fetchInitialAppState())
        },
        handleSnackbarClose: (reason: string) => {
            if (reason === "timeout") {
                dispatch(iterateSnackbar())
            }
        },
        toggleSidebar: () => {
            dispatch(toggleSidebarState())
        },
        onChangeElection: (event: any, index: number, electionId: string) => {
            dispatch(setCurrentElection(electionId))
        },
    }
}

const AppContainerWrapped = connect(mapStateToProps, mapDispatchToProps)(AppContainer)

export default AppContainerWrapped