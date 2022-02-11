import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import { appStateType } from "../Redux/redux-store";

//types:
type mapSateToPropsType = {
    isAuth: boolean
}
type propTypes = mapSateToPropsType

const mapStateToPropsForRedirect = (state: appStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
};

//принимает на вход компоненту, обертывыет в контейнерную комп-ту и возвращает эту конт. комп-ту
export function withAuthRedirect<ComponentProps>(Component: React.ComponentType<ComponentProps>) {

    function AuthRedirectContainerComponent(props: propTypes) {
        const {isAuth, ...restProps} = props

        if (!isAuth) {return <Redirect to={'/login'}/>}
        return <Component {...restProps as ComponentProps}/>
    };
    let AuthRedirectContainerComponentWithState = connect(mapStateToPropsForRedirect) (AuthRedirectContainerComponent);

    return AuthRedirectContainerComponentWithState
};


