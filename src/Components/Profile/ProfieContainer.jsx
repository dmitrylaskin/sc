import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getUserProfileThunkCreator,
    getUserStatusThunkCreator, savePhotoThunkCreator, saveProfileThunkCreator,
    setUserProfile,
    updateUserStatusThunkCreator
} from "../Redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../Hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {


    refreshProfile() {
        //берем userId из url в строке ввода браузера
        let userId = this.props.match.params.userId
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

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }
    render() {

        return <Profile saveProfile={this.props.saveProfileThunkCreator}
                        esavePhoto={this.props.savePhotoThunkCreator}
                        isOwner={!this.props.match.params.userId} {...this.props}
                        profile={this.props.profile}
                        updateUserStatusThunkCreator={this.props.updateUserStatusThunkCreator}/>
    }
}

const mapStateToProps = (state) => {

    return {
        profile: state.ProfilePage.profile,
        status: state.ProfilePage.status,
        authorisedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
};

let Composed = compose(
    connect(mapStateToProps, {
        setUserProfile,
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
