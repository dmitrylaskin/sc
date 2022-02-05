import { photosType } from './../Types/types';
import { profileType } from "../Types/types";
import { instance, defaultResponseType, responseType } from "./api";

export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get<profileType>(`profile/${userId}`);
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`);
    },
    getUpdateStatus(status: string) {
        return instance.put<defaultResponseType>(`profile/status`, { status: status });
    },
    getPhoto(file: any) {
        const formData = new FormData();
        formData.append('image', file);
        return instance.put<responseType<savePhotoDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: profileType) {
        return instance.put<responseType>(`profile`, profile);
    }
};

type savePhotoDataType = {
    photos: photosType
}