import { instance } from "./api";


export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<getLoginOutType>(`security/get-captcha-url`);
    }
};

export type getLoginOutType = {
    url: string
}