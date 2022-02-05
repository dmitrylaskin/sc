import axios from "axios";

export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {'API-KEY': '5cf4903e-57bb-48e6-bfa5-8d21e3653b58'}

});
// types:
export type defaultResponseType = {
    data: object,
    messages: Array<any>,
    fieldsErrors: Array<any>,
    resultCode: resultCodeEnum
}
export enum resultCodeEnum {
    success = 0,
    error = 1,
    captchaIsRequired = 10,
}
export type responseType<D = {}, RC = resultCodeEnum> = {
    data: D
    messages: Array<string>
    fieldsErrors: Array<any>,
    resultCode: RC
}