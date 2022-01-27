import {authAPI, resultCodeEnum, securityAPI} from "../../api/api";
import {stopSubmit} from "redux-form";
import {appStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";

const SET_USER_DATA = 'auth/SET-USER-DATA';
const GET_CAPTCHA_SUCCESSFUL = 'auth/GET-CAPTCHA-SUCCESSFUL';


let initialState = {
    userId: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null

};
type initialStateType = typeof initialState

let authReducer = (state = initialState, action: actionsTypes): initialStateType => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            };
        case GET_CAPTCHA_SUCCESSFUL:
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;

    }
}
type actionsTypes = setAuthUserDataType | getCaptchaSuccessfulType

type setAuthUserDataType = {
    type: typeof SET_USER_DATA,
    payload: {userId: number | null, login: string | null, email: string | null, isAuth: boolean}
}
type getCaptchaSuccessfulType = {
    type: typeof GET_CAPTCHA_SUCCESSFUL,
    payload: {captchaUrl: string}
}

export const setAuthUserData = (userId: number | null, login: string | null, email: string | null, isAuth: boolean): setAuthUserDataType => {
    return {type: SET_USER_DATA, payload: {userId, login, email, isAuth}}
};

export const getCaptchaSuccessful = (captchaUrl: string): getCaptchaSuccessfulType => ({type: GET_CAPTCHA_SUCCESSFUL, payload: {captchaUrl}})




//THUNKS:
type thunksType = ThunkAction<Promise<void>, appStateType, unknown, actionsTypes>

export const getAuthUserDataThunkCreator = (): thunksType =>
    async (dispatch) => {
        //второй return возвращает вызов thunkcreator'а наоружу
        let response = await authAPI.getAuthUserData()

                if (response.data.resultCode === resultCodeEnum.success) {
                    let {id, login, email} = response.data.data;
                    dispatch(setAuthUserData(id, login, email, true))
                }
    }

export const getLoginThunkCreator = (email: string, password: string, rememberMe: boolean, captcha: string): thunksType =>

    async (dispatch: any) => {

        let response = await authAPI.getLogin(email, password, rememberMe, captcha)

        if (response.data.resultCode === resultCodeEnum.success) {
                    dispatch(getAuthUserDataThunkCreator())
                } else {
                    if (response.data.resultCode === resultCodeEnum.captchaIsRequired) {
                        dispatch(getCaptchaUrlThunkCreator())
                    }
                    let message = response.data.messages.length > 0 ? response.data.messages[0] : "unknown error"

                    dispatch(stopSubmit('login', {_error: message}))
                }

    }


export const getLogoutThunkCreator = (): thunksType =>
    async (dispatch) => {
        let response = await authAPI.getLoginout()
        // .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserData(null, null, null, false))
                }
    }


export const getCaptchaUrlThunkCreator = (): thunksType =>

    async (dispatch) => {

    let response = await securityAPI.getCaptchaUrl()
        let captchaUrl = response.data.url

        dispatch(getCaptchaSuccessful(captchaUrl))
    }

export default authReducer