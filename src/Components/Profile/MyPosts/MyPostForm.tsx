import React, { useState } from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { FieldValidatorType, maxLengthCreator, required } from "../../utils/validators/validators.ts";
import { Textarea } from "../../common/FormsControls/FormsControls.tsx";
//@ts-ignore
import style from './Post.module.css';

export type MyPostsFormPropsType = {
    placeholder: string
    name: string
    component: string | React.Component
    validate: Array<FieldValidatorType>
}
type PropsType = {}

export type PostFormValueType = {
    newPostText: string
}

const maxLength50 = maxLengthCreator(50)


const MyPostForm: React.FC<InjectedFormProps<PostFormValueType, PropsType> & MyPostsFormPropsType & PropsType> = ({ addTodo }) => {

    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        // prevent default action
        e.preventDefault();
        if (value) {
            // add todo
            addTodo(value);
            // clear form after submission
            setValue('');
        }
    };
    return (
        <form onSubmit={handleSubmit} >
            <span className={style.formPage}>
                <span>
                    <textarea type="text" value={value} onChange={(e) => setValue(e.target.value)} className={style.textareaForm} placeholder='Ваш пост...' />
                </span>
                <span>
                    <button type="submit" className={style.btnForm}>Add Task</button>
                </span>
            </span>


        </form>
    )
}
export default MyPostForm;
export const ReduxMyPostForm = reduxForm<PostFormValueType, PropsType>({ form: "ProfileAddNewPostForm" })(MyPostForm)
