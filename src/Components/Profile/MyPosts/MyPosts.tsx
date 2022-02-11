import React, { ReactElement, ReactNode } from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator} from "../../../utilites/validators/validators";
import {Textarea} from "../../common/FormControls/FormControls";
import {postType, profileType} from "../../../Types/types";

type propsType = {
    PostsData: Array<postType>
    addPost: (newPostText: string | null) => void
    profile: profileType
    reset: (formName: string) => void
}
type formDataType = {
    newPostText: string | null
}
type ownPropsType = {}

const MyPosts: React.FC<propsType> = (props) => {

    if(!props.profile) {
        return <div>Loading...</div>
    }

    let PostObj = props.PostsData.map((key) => <Post key={key.id} message={key.text} likes={key.likes} profile={props.profile}/>);

    //набранный текст хранится в стейте redux-form
    let addNewPost = (formData: formDataType) => {
        props.addPost(formData.newPostText)
        props.reset('AddPostForm')
    }

    return (
        <div className={classes.posts}>
            <h3>My Posts:</h3>
            <AddPostReduxForm onSubmit={addNewPost}/>
            <div className={classes.mes}>
                {PostObj}
            </div>
        </div>
    )
};

let maxLength = maxLengthCreator(50)

const AddPostForm: React.FC<InjectedFormProps<formDataType, ownPropsType> & ownPropsType> = (props) => {
    return (<div>
            <form className={classes.box} onSubmit={props.handleSubmit}>
                <div>
                    <Field component={Textarea} name={'newPostText'} placeholder={'Enter your text...'} validate={[maxLength]}/>
                </div>

                <div>
                    <button className={classes.button}>Add post</button>
                </div>
            </form>
        </div>
    )
}

const AddPostReduxForm = reduxForm<formDataType, ownPropsType>({form: 'AddPostForm'})(AddPostForm)

export default MyPosts