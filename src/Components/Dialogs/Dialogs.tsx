import React from "react";
import classes from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormControls/FormControls";
import {maxLengthCreator, required} from "../../utilites/validators/validators";
import {dialogsPropsType} from "../../Types/dialogs";


const Dialogs = (props: dialogsPropsType) => {
    let DialogObj = props.MessagesPage.DialogsData.map((key) => <DialogItem key={key.id} name={key.name} id={key.id}/>);
    let MesObj = props.MessagesPage.MessagesData.map((key) => <Message key={key.id} text={key.text}/>);


    //набранный текст хранится в стейте redux-form
    let addNewMessage = (formData: any) => {
        props.addMessage(formData.newMessageText)
        props.reset('addMessage')
    }

    return (

        <div className={classes.dialogs}>

            <div className={classes.dialogsItems}>
                {DialogObj}
            </div>

            <div className={classes.messages}>
                <div>{MesObj}</div>

                <AddMessageReduxForm onSubmit={addNewMessage}/>

            </div>

        </div>
    );
};


let maxLength = maxLengthCreator(10)

const AddMessageForm = (props: any) => {
    return (
            <div>
                <form  className={classes.box} onSubmit={props.handleSubmit}>
                    <Field component={Textarea} name={'newMessageText'} placeholder={'Enter your message...'} validate={[required, maxLength]}/>
                    <div>
                        <button className={classes.button}>Add Message</button>
                    </div>
                </form>

            </div>
    )
}



const AddMessageReduxForm = reduxForm({form: 'addMessage'})(AddMessageForm)

export default Dialogs