import * as React from "react"
import { connect } from "react-redux"

import StallInfoCard from "./StallInfoCard"
import { IStore, IStall } from "../../redux/modules/interfaces"

export interface IProps {
    stall: IStall
}

export interface IDispatchProps {}

export interface IStoreProps {}

export interface IStateProps {}

interface IOwnProps {}

export class StallInfoCardContainer extends React.PureComponent<IProps & IDispatchProps, IStateProps> {
    render() {
        const { stall } = this.props

        return <StallInfoCard stall={stall} />
    }
}

const mapStateToProps = (state: IStore, ownProps: IOwnProps): IStoreProps => {
    // const { elections } = state

    return {
        // election: elections.elections[ownProps.params.electionIdentifier],
        // pollingPlaceId: ownProps.params.pollingPlaceId || null,
    }
}

const mapDispatchToProps = (dispatch: Function): IDispatchProps => {
    return {}
}

const StallInfoCardContainerWrapped = connect(mapStateToProps, mapDispatchToProps)(StallInfoCardContainer)

export default StallInfoCardContainerWrapped