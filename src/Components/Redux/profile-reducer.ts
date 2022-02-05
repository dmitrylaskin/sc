import { ThunkAction } from 'redux-thunk';
import { profileAPI } from "../../api/profileAPI";
import {stopSubmit} from "redux-form";
import {photosType, postType, profileType} from "../../Types/types";
import { appStateType, InferActionsType } from "./redux-store";

let ADD_POST = 'profile/ADD-POST';
let SET_USER_PROFILE = 'profile/SET-USER-PROFILE';
let SET_USER_STATUS = 'profile/SET-USER-STATUS';
let DELETE_POST = 'profile/DELETE-POST';
let PHOTO_IS_SAVED = 'profile/PHOTO-IS-SAVED';

let initialState = {
    PostsData: [
        {id: 1, text: 'Its my first post', likes: 24},
        {id: 2, text: 'Hello, hi are you?', likes: 3},
        {id: 3, text: 'Yo!', likes: 3}
    ] as Array<postType>,
    profile: null as profileType | null,
    status: ''
};
type initialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): initialStateType => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 4,
                text: action.body,
                likes: 80
            };
            return {
                ...state,
                PostsData: [newPost, ...state.PostsData,],

            };
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_USER_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                PostsData: state.PostsData.filter(p => p.id != action.postId)
            }
        }
        case PHOTO_IS_SAVED: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photoFile } as profileType //temp. solution
            }
        }
        default:
            return state;
    }
};

export const actions = {
    addPost: (newPostText: string)=> ({type: ADD_POST, body: newPostText}),
    setUserProfile: (profile: profileType)=> ({type: SET_USER_PROFILE, profile: profile}),
    setUserStatus: (status: string) => ({type: SET_USER_STATUS, status: status}),
    deletePost: (postId: number) => ({type: DELETE_POST, postId}),
    savePhotoSuccessful: (photoFile: photosType) => ({type: PHOTO_IS_SAVED, photoFile})
}
// types:
type actionsTypes = InferActionsType<typeof actions>
type thunkType = ThunkAction<Promise<void>, appStateType, unknown, actionsTypes | ReturnType<typeof stopSubmit>>

//THUNKS:
export const getUserProfileThunkCreator = (userId: number): thunkType =>
    async (dispatch) => {

        let response = await profileAPI.getUserProfile(userId)
                dispatch(actions.setUserProfile(response.data))
    }

export const getUserStatusThunkCreator = (userid: number): thunkType =>
    async (dispatch) => {
       let response = await profileAPI.getStatus(userid)
                dispatch(actions.setUserStatus(response.data))

    }

export const updateUserStatusThunkCreator = (status: string): thunkType =>
    async (dispatch) => {
    try {
        let response = await profileAPI.getUpdateStatus(status)

        if (response.data.resultCode === 0) {
            dispatch(actions.setUserStatus(status))
        }
    } catch (error) {
        // 1.dispatch
        // 2.alert
        }
    }

export const savePhotoThunkCreator = (file: File): thunkType =>
    async (dispatch) => {
    let response = await profileAPI.getPhoto(file)
        if (response.data.resultCode === 0) {
            dispatch(actions.savePhotoSuccessful(response.data.data.photos))
        }

    }

export const saveProfileThunkCreator = (profile: profileType): thunkType =>

    async (dispatch, getState) => {

    //в рамках одного редьюсера есть возможность обращатсья к другим редьюсерам
    //и к глобальному стейту
        try {
            let userId = getState().auth.userId
            let response = await profileAPI.saveProfile(profile)
            console.log(response);
            

            if (response.data.resultCode === 0) {
                if (userId) {
                    dispatch(getUserProfileThunkCreator(userId))
                } else {
                    throw new Error("userId can't be null")
                }
            } else {
                dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}))
                // для выделения конкретного поля
                //dispatch(stopSubmit('edit-profile', {"contacts": {"facebook": response.data.messages[0]}}))
                return Promise.reject(response.data.messages[0])
            }
        }
        catch (error) {
            // 1.dispatch
            // 2.alert
        }

    }

export default profileReducer