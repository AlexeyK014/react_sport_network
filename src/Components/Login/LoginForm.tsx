import React from "react";
import { Field, InjectedFormProps } from "redux-form";
import { maxLengthCreator, required } from "../utils/validators/validators.ts";
import { Input, } from "../common/FormsControls/FormsControls.tsx";
//@ts-ignore
import style from '../common/FormsControls/FormsControls.module.css';
//@ts-ignore
import s from './LoginForm.module.css';
import { LoginFormOwnProps, LoginFormValuesType } from "../../Types/Types.ts";



let maxLength30 = maxLengthCreator(30);


export type LoginFormValuesTypeKeys = keyof LoginFormValuesType



const LoginForm: React.FC<LoginFormOwnProps & InjectedFormProps<LoginFormValuesType, LoginFormOwnProps, string> & LoginFormOwnProps>
    = ({ handleSubmit, error, captchaUrl }) => {
        return (

            <form onSubmit={handleSubmit} className={s.formPage}>
                <h1 className={style.title}>Войти</h1>
                <div className={s.inputForm}>
                    <div>
                        <Field placeholder="email" name={"email"} component={Input} validate={[required, maxLength30]} />
                    </div>
                    <div>
                        <Field placeholder="password" type="password" name={"password"} component={Input} validate={[required, maxLength30]} />
                    </div>
                </div>

                <div className={s.checkboxForm}>
                    <Field type="checkbox" name={"rememberMe"} component={'input'} />remember me
                </div>

                {captchaUrl && <img src={captchaUrl} />}
                {captchaUrl && <Field component={Input} name={"captcha"} placeholder="Symbols from image" validate={[required]} />}

                {
                    error && <div className={style.formSummaryError}>
                        {error}
                    </div>
                }
                <div>
                    <button className={s.btnLogin}>Войти</button>
                </div>

            </form>
        )
    }

export default LoginForm;