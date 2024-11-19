import React from "react";
//@ts-ignore
import style from './FormsControls.module.css'
import { WrappedFieldProps } from "redux-form";
import { FormControlPropsType, LoginFormValuesType } from "../../../Types/Types";


export type LoginFormValuesTypeKeys = keyof LoginFormValuesType

export const Textarea: React.FC<WrappedFieldProps & FormControlPropsType> = ({input, meta: {touched, error}, ...props}) => {
    const hasError = touched && error;
    return (
        <div className={style.formControl  + ' ' + (hasError ? style.error : "") }>
            <div>
                <textarea {...input} {...props}/>
            </div>
            
            { hasError && <span>{error}</span> }
        </div>
    )
}

export const Input: React.FC<WrappedFieldProps & FormControlPropsType> = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={style.formControl  + ' ' + (hasError ? style.error : "") }>
            <div>
                <input {...input} {...props}/>
            </div>
            
            { hasError && <span>{meta.error}</span> }
        </div>
    )
}