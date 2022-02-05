import {resultCodeEnum} from "../../api/api";
import { securityAPI } from "../../api/securityAPI";
import { authAPI } from "../../api/authAPI";
import {stopSubmit} from "redux-form";
import {appStateType, InferActionsType} from "./redux-store";
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

const actions = {
    setAuthUserData : (userId: number | null, login: string | null, email: string | null, isAuth: boolean) => {
        return {type: SET_USER_DATA, payload: {userId, login, email, isAuth}}
    },
    getCaptchaSuccessful: (captchaUrl: string) => ({type: GET_CAPTCHA_SUCCESSFUL, payload: {captchaUrl}})
}
// types:
type actionsTypes = InferActionsType<typeof actions>


//THUNKS:
type thunksType = ThunkAction<Promise<void>, appStateType, unknown, actionsTypes | ReturnType<typeof stopSubmit>>

export const getAuthUserDataThunkCreator = (): thunksType =>
    async (dispatch) => {
        //второй return возвращает вызов thunkcreator'а наоружу
        let response = await authAPI.getAuthUserData()

                if (response.data.resultCode === resultCodeEnum.success) {
                    let {id, login, email} = response.data.data;
                    dispatch(actions.setAuthUserData(id, login, email, true))
                }
    }

export const getLoginThunkCreator = (email: string, password: string, rememberMe: boolean, captcha: string): thunksType =>

    async (dispatch) => {

        let response = await authAPI.getLogin(email, password, rememberMe, captcha)
        console.log(response);

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
                    dispatch(actions.setAuthUserData(null, null, null, false))
                }
    }


export const getCaptchaUrlThunkCreator = (): thunksType =>

    async (dispatch) => {

    let response = await securityAPI.getCaptchaUrl()
        let captchaUrl = response.data.url

        dispatch(actions.getCaptchaSuccessful(captchaUrl))
    }

export default authReducer