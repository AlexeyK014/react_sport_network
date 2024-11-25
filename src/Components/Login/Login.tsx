import React from "react";
import LoginForm from "./LoginForm.tsx";
import { reduxForm } from "redux-form";
import { login } from "../Redux/auth-reducer.ts"
import { Navigate } from "react-router-dom";
import { AppStateType } from "../Redux/redux-store.ts";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
//@ts-ignore
import style from './Login.module.css';
import { LoginFormValuesType } from "../../Types/Types.ts";


//@ts-ignore
const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps, string>({ form: 'login' })(LoginForm);


export const Login: React.FC = (props) => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormValuesType) => {
        // @ts-ignore
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha) as unknown as AnyAction)
    }
    const userId = useSelector((state: AppStateType) => state.auth.userId);
    if (isAuth) {
        return <Navigate to={`/profile/${userId}`} />
    }
    return (
        <div className={style.wrapper}>
            <div className={style.loginPage}>
                <p className={style.titleOne}>
                    Место спорта и здорового образа жизни
                </p>
                <span className={style.title}>
                    <span className={style.line}></span>
                    ТВОЙ СПОРТ
                    <span className={style.line}></span>
                </span>

                <p className={style.titleOne}>
                    Для спотрсменов и тренеров
                </p>

                <p className={style.subscribe}>
                    Присоединяйся!
                </p>
                

                <div className={style.loginBlock}>
                    <div>
                        <LoginReduxForm
                            onSubmit={onSubmit}
                            //@ts-ignore
                            captchaUrl={captchaUrl} />
                    </div>
                </div>
            </div>
        </div>
    )
}


