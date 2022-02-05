import { actions } from "../Redux/message-reducer"
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../Hoc/withAuthRedirect";
import {compose} from "redux";
import {reset} from 'redux-form';
import {appStateType} from "../Redux/redux-store";

const mapStateToProps = (state: appStateType) => {
    return {
        MessagesPage: state.MessagesPage,

    }
};

let Composed = compose(
    connect(mapStateToProps, {addMessage: actions.addMessage, reset}),
    withAuthRedirect
)(Dialogs);

export default Composed
