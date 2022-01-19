import React from "react";
import classes from './Post.module.css'
import likePic from "../../../../assets/images/likev1.png";
import userPhoto from "../../../../assets/images/user-icon.png"
import {postType, profileType} from "../../../../Types/types";

type propsType = {
    message: string
    likes: number
    profile: profileType
}

const Post: React.FC<propsType> = (props) => {

    return (
            <div className={classes.item}>
                {/*если нет фото, отображается пустота, нужно дописать условие*/}
                <div className={classes.userInfo}>
                    <img src={props.profile.photos.small || userPhoto} alt=""/>

                    <div className={classes.username}>
                        {props.profile.fullName}
                    </div>
                    <div><span className={classes.time}>{new Date().toLocaleTimeString()}</span><span className={classes.time}>{new Date().toLocaleDateString()}</span></div>

                </div>

                <div className={classes.textMessage}>{props.message}</div>

                <div className={classes.like}>
                        <img src={likePic}/>
                        <div className={classes.likesCount}>
                            {props.likes}
                        </div>

                </div>

            </div>

    )
}
export default Post