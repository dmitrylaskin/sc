import { instance, resultCodeEnum, responseType } from "./api";


export const authAPI = {
    getAuthUserData() {
        return instance.get<responseType<getAuthUserDataType, resultCodeEnum>>(`auth/me`);
    },
    getLogin(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post<responseType<logInDataType, resultCodeEnum>>(`auth/login`, { email, password, rememberMe, captcha });
    },
    getLoginout() {
        return instance.delete<responseType<logOutDataType, resultCodeEnum>>(`auth/login`);
    }
};
// types:
type getAuthUserDataType = {
    id: number,
    login: string
    email: string
}
type logInDataType = {
    userId: number
}
type logOutDataType = {
    id: number,
    login: string
    email: string   
}