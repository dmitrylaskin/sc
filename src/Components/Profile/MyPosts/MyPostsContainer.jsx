import React from "react";
import {addPost} from "../../Redux/profile-reducer"
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {reset} from 'redux-form';

const mapStateToProps = (state) => {

    return {
        PostsData: state.ProfilePage.PostsData,
        newPostText: state.ProfilePage.newPostText,
        profile: state.ProfilePage.profile

    }
};


let MyPostsContainer = connect(mapStateToProps, {addPost, reset})(MyPosts);

export default MyPostsContainer