import React, {useState} from "react";
import classes from './ProfileInfo.module.css'
import preloader from '../../../assets/images/spinning-circles.svg'
import ProfileStatusWithHooks from "../ProfileStatus/ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user-icon.png"
import ProfileDataForm from "./ProfileDataForm";


const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false)

    if(!props.profile) {
        return <img src={preloader}/>
        // return <preloader/>
    }
    const onMainPhotoSelected = (event) => {
        if (event.target.files.length) {
            props.saveProfile(event.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData)
            .then(() => {
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

                {editMode ? <ProfileDataForm initialValues={props.profile} onSubmit={onSubmit} {...props}/> : <ProfileData {...props} goEditMode={()=> {setEditMode(true)}} isOwner={props.isOwner}/>}


            </div>
        </div>
    )
}

let Contact = ({contactKey, contactValue}) => {
    return <div className={classes.contacts}><b>{contactKey}</b>: {contactValue}</div>

}
let ProfileData = (props) => {
    return (<div>
        {props.isOwner && <div><button className={classes.button} onClick={props.goEditMode}>edit</button></div>}


        <h3>Profile info: </h3>
        <div><b>About Me:</b> {props.profile.aboutMe}</div>
        <div><b>Full name:</b> {props.profile.fullName}</div>
        <div><b>Looking for a job: </b>{props.profile.lookingForAJob ? "yes" : "no"}</div>
        <div><b>My professional skills: </b> {props.profile.lookingForAJobDescription}</div>
        <div><h4>Contacts:</h4> {Object.keys(props.profile.contacts).map(key => {
            return <Contact key={key} contactKey={key} contactValue={props.profile.contacts[key]}/>
        })}</div>

    </div>)
}

export default ProfileInfo