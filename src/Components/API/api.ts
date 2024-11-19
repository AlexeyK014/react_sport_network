import { UserType } from './../../Types/Types';
import axios from "axios";



export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "bed6ca62-291b-4bb7-b19b-b61c0a934821"
    }
});

export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeEnumForCaptcha {
    CaptchaIsRequired = 10
}

export type GetUsersItems = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}



