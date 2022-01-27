import {usersAPI} from "../../api/api";
import { userType } from "../../Types/types";
import {appStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";

const FOLLOW ='users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLW';
const SET_USERS = 'users/SET-USERS';
const SET_CURRENT_PAGE = 'users/SET-CURRENT-PAGE';
const TOTAL_USERS_COUNT = 'users/TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE-IS-FETCHING ';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE-IS-FOLLOWING-PROGRESS'

let initialState = {
    users: [] as Array<userType>,
    pageSize: 5,
    totalUsersCount: 21,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>,
};
type initialStateType = typeof initialState

let usersReducer = (state = initialState, action: actionsTypes): initialStateType => {

    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map((key) => {
                        if (key.id === action.userid) {
                            return {...key, followed: true} // возвращем копию объекта user[?], 'followed:' затираем
                        }
                        return key
                    }
                )
            };
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map((key) => {
                        if (key.id === action.userid) {
                            return {...key, followed: false}
                        }
                        return key
                    }
                )
            };
        }
        case SET_USERS: {
            return {
                ...state,
                users: [...action.users]
            }
        } case SET_CURRENT_PAGE: {
            return {
                ...state,
                 currentPage: action.page

            }
        } case TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.count
            }
        } case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.toggle

            }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {

            return {
                ...state,
                followingInProgress: action.statusProgress
                ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default: return state;
    }
};

type actionsTypes = followType | unfollowType | setUsersType | setCurrentPageType | setTotalUsersCountType | toggleIsFetchingType | toggleFollowingProgressType

type followType = {
    type: typeof FOLLOW, userid: number
}
type unfollowType = {
    type: typeof UNFOLLOW, userid: number
}
type setUsersType = {
    type: typeof SET_USERS, users: Array<userType>
}
type setCurrentPageType = {
    type: typeof SET_CURRENT_PAGE, page: number
}
type setTotalUsersCountType = {
    type: typeof TOTAL_USERS_COUNT, count: number
}
type toggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING, toggle: boolean
}
type toggleFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS, statusProgress: boolean, userId: number
}


export const follow = (userid: number): followType => ({type: FOLLOW, userid});
export const unfollow = (userid: number):unfollowType => ({type: UNFOLLOW, userid});
export const setUsers = (users: Array<userType>): setUsersType => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage: number): setCurrentPageType => ({type: SET_CURRENT_PAGE, page: currentPage});
export const setTotalUsersCount = (totalCount: number): setTotalUsersCountType => ({type: TOTAL_USERS_COUNT, count: totalCount});
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, toggle: isFetching});
export const toggleFollowingProgress = (statusProgress: boolean, userId: number): toggleFollowingProgressType => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, statusProgress, userId})




//THUNKS:
type thunksType = ThunkAction<Promise<void>, appStateType, unknown, actionsTypes>


export const getUsersThunkCreator = (currentPage: number, pageSize: number):thunksType => {
    //currentPage, pageSize замыкаются в thunk
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))

        let data = await usersAPI.getUsers(currentPage, pageSize)

        dispatch(toggleIsFetching(false))
                dispatch(setUsers(data.items))
                dispatch(setTotalUsersCount(data.totalCount))

    }
}


export const getUsersThunkCreatorPageChanged = (pageNumber: number, pageSize: number): thunksType =>
    //currentPage, pageSize замыкаются в thunk
    async (dispatch) => {
        dispatch(setCurrentPage(pageNumber))
        dispatch(toggleIsFetching(true))

        let data = await usersAPI.getUsers(pageNumber, pageSize)

                dispatch(toggleIsFetching(false))
                dispatch(setUsers(data.items));

    }


export const unfollowThunk = (userId: number): thunksType =>
    //currentPage, pageSize замыкаются в thunk
    async (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId))

        let response = await usersAPI.getFollow(userId)

                if (response.data.resultCode === 0) {
                    dispatch(unfollow(userId))
                }
                dispatch(toggleFollowingProgress(false, userId))
    }


export const followThunk = (userId: number): thunksType =>
    async (dispatch) => {
       dispatch( toggleFollowingProgress(true, userId))
        let response = await usersAPI.getUnfollow(userId)

        if (response.data.resultCode === 0) {
                    dispatch(follow(userId))
                }
               dispatch( toggleFollowingProgress(false, userId))
    }

export default usersReducer