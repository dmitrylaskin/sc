import {NavLink} from "react-router-dom";
import classes from "./Users.module.css";
import userPhoto from "../../assets/images/user-icon.png";
import React from "react";
import {userType} from "../../Types/types";

type propsType = {
    user: userType
    followThunk: (userId: number) => void
    unfollowThunk: (userId: number) => void
    followingInProgress: Array<number>

}

const User: React.FC<propsType> = (props) => {

    return (<div className={classes.userIcons} key={props.user.id}>

                <span>
                    <div>
                        <NavLink to={'/profile/' + props.user.id}>
                        <img className={classes.usersPhoto} src={

                            props.user.photos.small != null ? props.user.photos.small : userPhoto

                        } alt=""/>
                        </NavLink>
                    </div>
                    <div>
                        {
                            props.user.followed ? <button disabled={props.followingInProgress.some(id => id === props.user.id)} onClick={() => {

                                    props.unfollowThunk(props.user.id)


                                }}>Unfollow</button>

                                : <button disabled={props.followingInProgress.some(id => id === props.user.id)} onClick={() => {

                                    props.followThunk(props.user.id)


                                }}>Follow</button>
                        }
                    </div>
                    <span>
                        <span>
                            <div><b>Username:</b> {props.user.name}</div>
                            <div><b>Status:</b> {props.user.status}</div>
                        </span>

                    </span>
                </span>
    </div>)
}

export default User
