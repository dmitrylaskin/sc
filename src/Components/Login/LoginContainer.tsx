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
type mapStateType = {
    isAuth: boolean
    captchaUrl: string | null
}

type mapDispatchType = {
    getLoginThunkCreator: (email: string, password: string, rememberMe: boolean, captcha: string) => void
    getLogoutThunkCreator: () => void
}
type ownProps = {}

export default connect<mapStateType, mapDispatchType, ownProps, appStateType>(mapStateToProps, {getLoginThunkCreator, getLogoutThunkCreator})(Login)