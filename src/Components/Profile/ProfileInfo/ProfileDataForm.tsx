import React from "react";
import {Input, Textarea} from "../../common/FormControls/FormControls";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import classes from "./ProfileInfo.module.css"
import { profileType } from "../../../Types/types";

type ownPropsType = {
    error: number
    profile: profileType
}


let ProfileDataForm: React.FC<InjectedFormProps<profileType, ownPropsType> & ownPropsType> = (props) => {
    return (<form onSubmit={props.handleSubmit}>
        {<div><button className={classes.button}>save</button></div>}

        {props.error && <div className={classes.formSummaryError}>
            {props.error}

        </div>}

        <h3>Profile info: </h3>

        <div><b>About Me:</b> {
            <Field component={Input} name={'aboutMe'} placeholder={'about me'} validate={[]}/>
        }</div>

        <div><b>Full name:</b> {
            <Field component={Input} name={'fullName'} placeholder={'name'} validate={[]}/>
        }</div>

        <div><b>Looking for a job: </b>
        <Field type={'checkbox'} component={Input} name={'lookingForAJob'} placeholder={''} validate={[]}/>
        </div>

        <div><b>My professional skills: </b>
            <Field component={Textarea} name={'lookingForAJobDescription'} placeholder={''} validate={[]}/>
        </div>

        <div><h4>Contacts:</h4> {Object.keys(props.profile.contacts).map(key => {
            return <div key={key} className={classes.contacs}>
                <b>{key}:{<Field component={Textarea} name={'contacts.' + key} placeholder={key} validate={[]}/>} </b>
                </div>

        })}</div>

    </form>)
}
let ProfileDataFormReduxForm = reduxForm<profileType, ownPropsType>({form: 'edit-profile'}) (ProfileDataForm)

export default ProfileDataFormReduxForm