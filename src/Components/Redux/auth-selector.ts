import { AppStateType } from "./redux-store";


export const selectAuth = (state: AppStateType) => {
    return state.auth.isAuth
}
export const selectCurrentUserLogin = (state: AppStateType) => {
    return state.auth.login
}

