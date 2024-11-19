import { APIResponseType, ResultCodeEnum, ResultCodeEnumForCaptcha, instance } from "./api.ts"


type MeResponseDataType = {
    id: number 
    email: string
    login: string
}
type LoginResponseType = {
    userId: number | null
}


export const authAPI = {
    me(){
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null){
        return instance.post<APIResponseType<LoginResponseType, ResultCodeEnum | ResultCodeEnumForCaptcha>>('auth/login', {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logout(){
        return instance.delete('auth/login')  // при логауте, сервер удаляет Cookie
    }
    
}