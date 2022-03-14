import {createSelector} from "reselect";
import {appStateType} from "./redux-store";


export const getUsersSelector = (state: appStateType) => {
    return state.usersPage.users
};

// вся сложная логика должна находится в селекторе, созданном через createSelector
// render в этом случае не вызывается постоянно, т.к. суперселектор сначала обращается к своему кэшу и проверяет
// произошли ли изменения в передаваемом объекте
export const getUsersSelectorSuper = createSelector(getUsersSelector, (users) => {
    return users.filter(u => true)
});

export const getPageSizeSelector = (state: appStateType) => {
    return state.usersPage.pageSize
};
export const getTotalUsersCountSelector = (state: appStateType) => {
    return state.usersPage.totalUsersCount
};
export const getCurrentPageSelector = (state: appStateType) => {
    return state.usersPage.currentPage
};
export const getIsFetchingSelector = (state: appStateType) => {
    return state.usersPage.isFetching
};
export const getFollowingInProgressSelector = (state: appStateType) => {
    return state.usersPage.followingInProgress
};
export const getUsersFilterSelector = (state: appStateType) => {
    return state.usersPage.filter
}