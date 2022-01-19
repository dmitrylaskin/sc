import React from "react";
import {connect} from "react-redux";
import {getLoginThunkCreator, getLogoutThunkCreator} from "../Redux/auth-reducer";
import Login from "./Login";
import {appStateType} from "../Redux/redux-store";

const mapStateToProps = (state: appStateType) => {

    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

export default connect(mapStateToProps, {getLoginThunkCreator, getLogoutThunkCreator})(Login)