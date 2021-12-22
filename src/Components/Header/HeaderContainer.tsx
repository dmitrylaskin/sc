import React from "react";
import Header from "./Header";
import {getAuthUserDataThunkCreator, getLogoutThunkCreator, setAuthUserData} from '../Redux/auth-reducer'
import {connect} from "react-redux";
import {appStateType} from "../Redux/redux-store";

type mapStateToPropsType = {
    login: string | null
    isAuth: boolean
}

type mapDispatchToProps = {
    setAuthUserData: any
    getAuthUserDataThunkCreator: () => void
    getLogoutThunkCreator: () => void
}

type ownPropsType = {}

type propsType = mapStateToPropsType & mapDispatchToProps & ownPropsType

class HeaderContainer extends React.Component<propsType> {

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: appStateType): mapStateToPropsType => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth
    }
};
export default connect<mapStateToPropsType, mapDispatchToProps, ownPropsType, appStateType>(mapStateToProps, {setAuthUserData, getAuthUserDataThunkCreator, getLogoutThunkCreator}) (HeaderContainer)