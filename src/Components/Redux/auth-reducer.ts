import { ThunkAction } from 'redux-thunk';
import { stopSubmit } from "redux-form";
import { ResultCodeEnum, ResultCodeEnumForCaptcha } from "../API/api.ts";
import { AppStateType, BaseThunkType, InferActionsTypes } from './redux-store';
import { authAPI } from '../API/auth-api.ts';
import { securutyARI } from '../API/security-api.ts';
import { Action } from 'redux';
import { useSelector } from 'react-redux';



let initialState = {
    userId: null as (number | null),
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null, // если null, тогда не показывается

}


export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>;


const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'auth/SET_USER_DATA':
        case 'auth/GET_CAPTHCA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export default authReducer;

/////////////////////  Actions //////////////////////

const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({ type: 'auth/SET_USER_DATA', payload: { userId, email, login, isAuth } } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({ type: 'auth/GET_CAPTHCA_URL_SUCCESS', payload: { captchaUrl } } as const)
}


/////////  Thunk  /////////

///////////////   Получаем данные профиля   ////////////////


export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me();
    if (meData.resultCode === ResultCodeEnum.Success) {
        let { id, email, login } = meData.data
        dispatch(actions.setAuthUserData(id, email, login, true))
        localStorage.setItem("login", login);

    }

}

///////////////   Логинемся   ////////////////

export const login = (email: string, password: string, rememberMe: boolean, captcha: null): ThunkType => async (dispatch) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha);
    if (loginData.resultCode === ResultCodeEnum.Success) {
        // success, get auth data
        dispatch(getAuthUserData())
    } else {
        if (loginData.resultCode === ResultCodeEnumForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error"
        //@ts-ignore
        dispatch(stopSubmit('login', { _error: message }));  // вторым свойстом указывается проблемное свойство

    }
    // localStorage.setItem("login", email); 
}

export const logoutTC = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }

}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securutyARI.getCaptchaUrl();
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}