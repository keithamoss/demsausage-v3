import * as React from "react"
import { connect } from "react-redux"
// import { formValueSelector, getFormValues, isDirty, initialize, submit, change } from "redux-form"
import { isDirty, submit } from "redux-form"

import ElectionEditor from "./ElectionEditor"
import { IStore, IElection } from "../../redux/modules/interfaces"
// import { updateElection } from "../../redux/modules/elections"

export interface IProps {
    onElectionCreated: Function
}

export interface IDispatchProps {
    onFormSubmit: Function
    onSaveForm: Function
}

export interface IStoreProps {
    isDirty: boolean
}

export interface IStateProps {}

interface IOwnProps {}

const fromFormValues = (formValues: any): IElection => {
    let formValuesCopy = JSON.parse(JSON.stringify(formValues))
    return {
        ...formValuesCopy,
    }
}

export class ElectionCreatorContainer extends React.Component<IProps & IStoreProps & IDispatchProps, IStateProps> {
    render() {
        const { onElectionCreated, isDirty, onFormSubmit, onSaveForm } = this.props

        return (
            <ElectionEditor
                election={null}
                initialValues={{}}
                isDirty={isDirty}
                onSubmit={(values: object, dispatch: Function, props: IProps) => {
                    onFormSubmit(values, onElectionCreated)
                }}
                onSaveForm={() => {
                    onSaveForm(isDirty)
                }}
            />
        )
    }
}

const mapStateToProps = (state: IStore, ownProps: IOwnProps): IStoreProps => {
    return {
        isDirty: isDirty("election")(state),
    }
}

const mapDispatchToProps = (dispatch: Function): IDispatchProps => {
    return {
        async onFormSubmit(values: object, onElectionCreated: Function) {
            const electionNew: Partial<IElection> = fromFormValues(values)
            console.log("onFormSubmit", "Create Election", electionNew)
            // const json = await dispatch(updateElection(election, electionNew))
            // if (json.rows === 1) {
            //     onElectionCreated()
            // }
            // dispatch(initialize("layerForm", layerFormValues, false))
        },
        onSaveForm: (isDirty: boolean) => {
            dispatch(submit("election"))
        },
    }
}

const ElectionCreatorContainerWrapped = connect(mapStateToProps, mapDispatchToProps)(ElectionCreatorContainer)

export default ElectionCreatorContainerWrapped
