import React from "react";
import './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { profileType } from "../../Types/types";

type propsType = {
    saveProfile: (arg: profileType) => void
    isOwner: boolean
    profile: profileType | null
    status: string
    updateUserStatusThunkCreator: (status: string) => void
}

const Profile: React.FC<propsType> = (props) => {

    return (
        <div>

            <ProfileInfo 
            saveProfile={props.saveProfile} 
            isOwner={props.isOwner} 
            profile={props.profile}
            status={props.status}  
            updateUserStatusThunkCreator={props.updateUserStatusThunkCreator}/>
            {/*посты видны только владельцу*/}
            {/* @ts-ignore */}
            {props.isOwner && <MyPostsContainer/>}

        </div>
    )
};
export default Profile