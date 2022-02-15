import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getUserProfileThunkCreator,
    getUserStatusThunkCreator, savePhotoThunkCreator, saveProfileThunkCreator,
    updateUserStatusThunkCreator, actions
} from "../Redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../Hoc/withAuthRedirect";
import {compose} from "redux";
import { appStateType } from "../Redux/redux-store";
import { profileType } from "../../Types/types";

type mapStatePropsTypes = ReturnType<typeof mapStateToProps>
type mapDispatchPropsType = {
        setUserProfile: () => void
        getUserProfileThunkCreator: (userId: number | null) => void
        updateUserStatusThunkCreator: (status: string) => void
        getUserStatusThunkCreator: (userId: number | null) => void
        savePhotoThunkCreator: (arg: File) => void
        saveProfileThunkCreator: (profile: profileType) => void
}
type propTypes = mapStatePropsTypes & mapDispatchPropsType & withRouterType

// withRouter type:
type PathParamsType = {
    userId: string
}
type withRouterType = RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<propTypes> {

    refreshProfile() {
        //берем userId из url в строке ввода браузера
        let userId: number | null = +this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorisedUserId
            if (!userId) {
                //программный редирект на login
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfileThunkCreator(userId)
        this.props.getUserStatusThunkCreator(userId)

    }

    //выполняется сразу после render() и сообщается, что можно делать запрос на сервер
    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: propTypes, prevState: appStateType) {

        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }
    render() {

        return <Profile saveProfile={this.props.saveProfileThunkCreator}
                        isOwner={!this.props.match.params.userId} {...this.props}
                        profile={this.props.profile}
                        updateUserStatusThunkCreator={this.props.updateUserStatusThunkCreator}/>
    }
}

const mapStateToProps = (state: appStateType) => {
    return {
        profile: state.ProfilePage.profile,
        status: state.ProfilePage.status,
        authorisedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
};

let Composed = compose<React.ComponentType>(
    connect(mapStateToProps, {
        setUserProfile: actions.setUserProfile,
        getUserProfileThunkCreator,
        updateUserStatusThunkCreator,
        getUserStatusThunkCreator,
        savePhotoThunkCreator,
        saveProfileThunkCreator
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);

export default Composed
