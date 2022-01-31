import {usersAPI} from "../../api/api";
import { userType } from "../../Types/types";
import {appStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import { InferActionsType } from "./redux-store";

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

// actions:
export const actions = {
    follow: (userid: number) => ({type: FOLLOW, userid} as const),
    unfollow: (userid: number) => ({type: UNFOLLOW, userid} as const),
    setUsers: (users: Array<userType>) => ({type: SET_USERS, users} as const),
    setCurrentPage: (currentPage: number) => ({type: SET_CURRENT_PAGE, page: currentPage} as const),
    setTotalUsersCount: (totalCount: number) => ({type: TOTAL_USERS_COUNT, count: totalCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, toggle: isFetching} as const),
    toggleFollowingProgress: (statusProgress: boolean, userId: number) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, statusProgress, userId} as const)
 }

 type actionsTypes = InferActionsType<typeof actions>




//THUNKS:
type thunksType = ThunkAction<Promise<void>, appStateType, unknown, actionsTypes>


export const getUsersThunkCreator = (currentPage: number, pageSize: number):thunksType => {
    //currentPage, pageSize замыкаются в thunk
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true))

        let data = await usersAPI.getUsers(currentPage, pageSize)

        dispatch(actions.toggleIsFetching(false))
                dispatch(actions.setUsers(data.items))
                dispatch(actions.setTotalUsersCount(data.totalCount))

    }
}


export const getUsersThunkCreatorPageChanged = (pageNumber: number, pageSize: number): thunksType =>
    //currentPage, pageSize замыкаются в thunk
    async (dispatch) => {
        dispatch(actions.setCurrentPage(pageNumber))
        dispatch(actions.toggleIsFetching(true))

        let data = await usersAPI.getUsers(pageNumber, pageSize)

                dispatch(actions.toggleIsFetching(false))
                dispatch(actions.setUsers(data.items));

    }


export const unfollowThunk = (userId: number): thunksType =>
    //currentPage, pageSize замыкаются в thunk
    async (dispatch) => {
        dispatch(actions.toggleFollowingProgress(true, userId))

        let response = await usersAPI.getFollow(userId)

                if (response.data.resultCode === 0) {
                    dispatch(actions.unfollow(userId))
                }
                dispatch(actions.toggleFollowingProgress(false, userId))
    }


export const followThunk = (userId: number): thunksType =>
    async (dispatch) => {
       dispatch( actions.toggleFollowingProgress(true, userId))
        let response = await usersAPI.getUnfollow(userId)

        if (response.data.resultCode === 0) {
                    dispatch(actions.follow(userId))
                }
               dispatch( actions.toggleFollowingProgress(false, userId))
    }

export default usersReducer