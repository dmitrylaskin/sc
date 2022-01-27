import axios from "axios";
import {profileType, userType} from "../Types/types";

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {'API-KEY': '5cf4903e-57bb-48e6-bfa5-8d21e3653b58'}

});
//метод instance.get возвращает промис
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<userTypeGet>(`users?page=${currentPage}&count=${pageSize}`, {})
            .then(response => {
                return response.data
            })
    },
    getFollow(id = 2) {
        return instance.delete<defaultResponseType>(`follow/${id}`, {
        })
    },
    getUnfollow(id = 2) {
        return instance.post<defaultResponseType>(`follow/${id}`, {}, {
      })
    }
};

export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get<profileType>(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
    },
    getUpdateStatus(status: string) {
        return instance.put<defaultResponseType>(`profile/status`, {status: status})
    },
    getPhoto(file: any) {
        const formData = new FormData();
        formData.append('image', file)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: profileType) {
        return instance.put<defaultResponseType>(`profile`, profile)
    }
};

export const authAPI = {
    getAuthUserData() {
        return instance.get<getAuthUserDataType>(`auth/me`)
    },
    getLogin(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post<getLoginType>(`auth/login`, {email, password, rememberMe, captcha})
    },
    getLoginout() {
        return instance.delete<defaultResponseType>(`auth/login` )
    }
};

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<getLoginOutType>(`security/get-captcha-url`)
    }
}

// types:
type getAuthUserDataType = {
    data: {
        id: number,
        login: string
        email: string
    },
    messages: Array<any>,
    fieldsErrors: Array<any>,
    resultCode: resultCodeEnum
}

type getLoginType = {
    data: {
        userId: number
    },
    messages: Array<any>,
    fieldsErrors: Array<any>,
    resultCode: resultCodeEnum
}

type getLoginOutType = {
    url: string
}

type defaultResponseType = {
    data: object,
    messages: Array<any>,
    fieldsErrors: Array<any>,
    resultCode: resultCodeEnum
}

type userTypeGet = {
    error: any
    items: Array<userType>
    totalCount: number
}

export enum resultCodeEnum {
    success = 0,
    error = 1,
    captchaIsRequired = 10,
}