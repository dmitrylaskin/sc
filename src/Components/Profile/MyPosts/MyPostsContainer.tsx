import React, { ComponentType } from "react";
import {actions} from "../../Redux/profile-reducer"
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {reset} from 'redux-form';
import {appStateType} from "../../Redux/redux-store";
import {postType, profileType} from "../../../Types/types";

type mapStateType = {
    PostsData: Array<postType>
    profile: profileType
}
type mapDispatchType = {
    addPost: (newPostText: string | null) => void
    reset: () => void
}
type ownPropsType = {}

const mapStateToProps = (state: appStateType) => {
    return {
        PostsData: state.ProfilePage.PostsData,
        profile: state.ProfilePage.profile
    }
};
// @ts-ignore
let MyPostsContainer = connect<mapStateType, mapDispatchType, ownPropsType, appStateType>(mapStateToProps,
{addPost: actions.addPost, reset})(MyPosts);

export default MyPostsContainer