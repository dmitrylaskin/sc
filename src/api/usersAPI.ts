import { userType } from "../Types/types";
import { instance, defaultResponseType } from "./api";

//метод instance.get возвращает промис
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<userTypeGet>(`users?page=${currentPage}&count=${pageSize}`, {})
            .then(response => {
                return response.data;
            });
    },
    getFollow(id = 2) {
        return instance.delete<defaultResponseType>(`follow/${id}`, {});
    },
    getUnfollow(id = 2) {
        return instance.post<defaultResponseType>(`follow/${id}`, {}, {});
    }
};

export type userTypeGet = {
    error: string | null
    items: Array<userType>
    totalCount: number
}