import { AppStateType } from "../redux-store";


export const selectApp = (state: AppStateType) => {
    return state.app.initialized
}