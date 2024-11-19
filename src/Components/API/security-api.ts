import { instance } from "./api.ts"


type GetCaptchaUrlType = {
    url: string
}

export const securutyARI = {
    getCaptchaUrl(){
        return instance.get<GetCaptchaUrlType>(`/security/get-captcha-url`)  // каптча появляется во время авторизации, значит нужно делать запрос из auth
            .then(res => res.data)
    }
    
}