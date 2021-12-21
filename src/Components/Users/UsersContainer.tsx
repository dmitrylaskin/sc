import React from "react";
import {connect} from "react-redux";
import {
    followThunk, getUsersThunkCreator, getUsersThunkCreatorPageChanged,
    setCurrentPage, setTotalUsersCount, setUsers,
    toggleFollowingProgress, toggleIsFetching, unfollowThunk
} from "../Redux/user-reducer";
import Users from "./Users";
import preloader from '../../assets/images/spinning-circles.svg'
import {withAuthRedirect} from "../Hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPageSelector, getFollowingInProgressSelector, getIsFetchingSelector,
    getPageSizeSelector,
    getTotalUsersCountSelector,
    getUsersSelector, getUsersSelectorSuper
} from "../Redux/user-selectors";
import classes from './Users.module.css'
import {userType} from "../../Types/types";
import {appStateType} from "../Redux/redux-store";


type mapDispatchPropsType = {
    followThunk: (userId: number) => void
    unfollowThunk: (userId: number) => void
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void
    getUsersThunkCreatorPageChanged: (pageNumber: number, pageSize: number) => void
}

type mapStatePropsType = {
    totalUsersCount: number
    currentPage: number
    pageSize: number
    isFetching: boolean
    followingInProgress: Array<number>
    users: Array<userType>
}

type OwnPropsType = {

}

type propsType = mapStatePropsType & mapDispatchPropsType & OwnPropsType


// контейнерная компонента для AJAX запроса на сервер
class UsersAPIComponent extends React.Component<propsType> {

    //выполняется сразу после render() и сообщается, что можно делать запрос на сервер
    componentDidMount() {
        //перенесен в thunk
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize)
    }

    // все методы яв-ся стрелочными ф-ми для сохранения контекста вызова
    onPageChanged = (pageNumber: number) => {
        //перенесен в thunk
        this.props.getUsersThunkCreatorPageChanged(pageNumber, this.props.pageSize)
    }

    render() {

        return <>

            {this.props.isFetching ? <img className={classes.preloader} alt={''} src={preloader}/> : null}

            <Users currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   unfollowThunk={this.props.unfollowThunk}
                   followThunk={this.props.followThunk}
                   totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}


const mapStateToProps = (state: appStateType): mapStatePropsType => {
//selectors:
    return {
        users: getUsersSelectorSuper(state),
        pageSize: getPageSizeSelector(state),
        totalUsersCount: getTotalUsersCountSelector(state),
        currentPage: getCurrentPageSelector(state),
        isFetching: getIsFetchingSelector(state),
        followingInProgress: getFollowingInProgressSelector(state),
    }

};

let Composed = compose(
    connect<mapStatePropsType, mapDispatchPropsType, OwnPropsType, appStateType>(mapStateToProps, {

        followThunk,
        unfollowThunk,
        getUsersThunkCreator,
        getUsersThunkCreatorPageChanged

    }),
    //withAuthRedirect
)(UsersAPIComponent);


export default Composed