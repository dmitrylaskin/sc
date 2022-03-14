import React from "react";
import classes from "./Users.module.css";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {userType} from "../../Types/types";
import UserSearch from "./UsersSearch/UsersSearch";
import { filterType } from "../Redux/user-reducer";

const Users: React.FC<propsType> = (props) => {
    return <>
    <UserSearch onFilterChanged={props.onFilterChanged}/>
        <div className={classes.usersIcons}>
            {props.users.map((u) => <User 
                                                    followThunk={props.followThunk}
                                                    unfollowThunk={props.unfollowThunk}
                                                    followingInProgress={props.followingInProgress}
                                                    //followed={props.followed}
                                                    user={u} key={u.id}
                                                />)
            }
        </div>
        <Paginator totalItemsCount={props.totalUsersCount} pageSize={props.pageSize} currentPage={props.currentPage} onPageChanged={props.onPageChanged}/>
    </>
};

type propsType = {
    totalUsersCount: number
    currentPage: number
    pageSize: number
    onPageChanged: (p: number) => void
    followThunk: (userId: number) => void
    unfollowThunk: (userId: number) => void
    followingInProgress: Array<number>
    users: Array<userType>
    onFilterChanged: (filter: filterType) => void
}

export default Users