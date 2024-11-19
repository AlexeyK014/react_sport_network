import { createSelector } from "reselect"
import { AppStateType } from "./redux-store";


///  Пример использование реселекта //////
     //  Путём дробления. Более сложный селктор использует более примитивный селектор

export const getUsers = (state: AppStateType) => {
    return state.usersPage.users
}

// export const getUsers = createSelector(getUsersSelector, (users) => {
//     return users.filter(u => true)  // это не сам селектор, это логика селектора
// });
////////////////////////////////////////////////



export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage 
}
export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching 
}
export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress 
}
export const getUsersFilter = (state: AppStateType) => {
    return state.usersPage.filter 
}