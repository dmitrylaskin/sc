import React, {ChangeEvent, useState} from "react";
import classes from './ProfileInfo.module.css'
import preloader from '../../../assets/images/spinning-circles.svg'
import ProfileStatusWithHooks from "../ProfileStatus/ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user-icon.png"
import ProfileDataForm from "./ProfileDataForm";
import {contactsType, profileType} from "../../../Types/types";

type propsType = {
    isOwner: boolean
    profile: profileType | null
    status: string
    saveProfile: (arg: profileType) => void
    updateUserStatusThunkCreator: (status: string) => void
}

const ProfileInfo: React.FC<propsType> = (props) => {

    let [editMode, setEditMode] = useState(false)

    if(!props.profile) {
        return <img src={preloader}/>
    
    }
    const onMainPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            // @ts-ignore
            props.saveProfile(event.target.files[0])
        }
    }

    const onSubmit = (formData: any) => {
        // @ts-ignore
        props.saveProfile(formData).then(() => {
                setEditMode(false)
            })
    }

    return (
        <div className={classes.item}>
            <div className={classes.description}>
                <img className={classes.mainPhoto} src={props.profile.photos.large || userPhoto}/>
                <div>
                    {props.isOwner &&
                    <input type={"file"} onChange={onMainPhotoSelected}/>}
                </div>
                <b>Status:</b> <ProfileStatusWithHooks isOwner={props.isOwner} status={props.status} updateUserStatusThunkCreator={props.updateUserStatusThunkCreator}/>
                {editMode 
                    ? <ProfileDataForm initialValues={props.profile} onSubmit={onSubmit} {...props}/> 
                    : <ProfileData {...props} goEditMode={()=> {setEditMode(true)}} isOwner={props.isOwner}/>}
            </div>
        </div>
    )
}
type contactType = {
    contactKey: string
    contactValue: string
}

let Contact: React.FC<contactType> = ({contactKey, contactValue}) => {
    return <div className={classes.contacts}><b>{contactKey}</b>: {contactValue}</div>
}

type profileDataType = {
    goEditMode: () => void
    isOwner: boolean
    profile: profileType | null
}

let ProfileData: React.FC<profileDataType> = (props) => {
    return (<div>
        {props.isOwner && <div><button className={classes.button} onClick={props.goEditMode}>edit</button></div>}


        <h3>Profile info: </h3>
        {/* @ts-ignore */}
        <div><b>About Me:</b> {props.profile.aboutMe}</div>
        {/* @ts-ignore */}
        <div><b>Full name:</b> {props.profile.fullName}</div>
        {/* @ts-ignore */}
        <div><b>Looking for a job: </b>{props.profile.lookingForAJob ? "yes" : "no"}</div>
        {/* @ts-ignore */}
        <div><b>My professional skills: </b> {props.profile.lookingForAJobDescription}</div>
        <div><h4>Contacts:</h4> 
        {/* @ts-ignore */}
        {Object.keys(props.profile.contacts).map(key => {
            //@ts-ignore
            return <Contact key={key} contactKey={key} contactValue={props.profile.contacts[key as keyof contactsType] }/>
        })}</div>

    </div>)
}

export default ProfileInfo