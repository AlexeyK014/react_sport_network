import React from "react";
import { actions} from "../Redux/dialogs-reducer.ts";
import Dialogs from "./Dialogs.tsx";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../HOC/withAuthRedirect.tsx";
import { compose } from "redux";
import { AppStateType } from "../Redux/redux-store.ts";



let mapStateToProps = (state: AppStateType) => {
    return{
        dialogs: state.dialogs,
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        addMessage: actions.addMessage
    }),
    withAuthRedirect
)(Dialogs)