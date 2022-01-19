import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utilites/validators/validators";
import {Textarea} from "../../common/FormControls/FormControls";
import {postType, profileType} from "../../../Types/types";

type propsType = {
    PostsData: Array<postType>
    addPost: (formData: any) => void
    newPostText: string
    profile: profileType
    reset: (formName: string) => void
}

const MyPosts: React.FC<propsType> = (props): any => {

    if(!props.profile) {
        return 'Loading...'
        // return <preloader/>
    }

    let PostObj = props.PostsData.map((key) => <Post key={key.id} message={key.text} likes={key.likes} profile={props.profile}/>);


    //набранный текст хранится в стейте redux-form
    let addNewPost = (formData: any) => {
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

const AddPostForm = (props: any) => {
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



const AddPostReduxForm = reduxForm({form: 'AddPostForm'})(AddPostForm)

export default MyPosts