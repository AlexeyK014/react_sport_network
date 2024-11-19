import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { FieldValidatorType, maxLengthCreator, required } from "../utils/validators/validators.ts";
import { Textarea } from "../common/FormsControls/FormsControls.tsx";

const maxLength100 = maxLengthCreator(100)

export type DialogFormOwnProps = {
    placeholder: string
    name: string
    component: string | React.Component
    validate: Array<FieldValidatorType>
}
type PropsType = {}

export type NewMessageFormType = {
    newMessageText: string
}

const DialogsForm: React.FC<InjectedFormProps<NewMessageFormType, PropsType> & DialogFormOwnProps & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field 
                    component={Textarea} 
                    name="newMessageText"   
                    placeholder="your message"
                    validate={[required,  maxLength100]}/>
            </div>
            <div>
                <button>Отправить сообщение</button>
            </div>
        </form>
    )
}

export default DialogsForm;
export const DialogsReduxForm = reduxForm<NewMessageFormType, PropsType>({form: 'dialogAddMessageForm'})(DialogsForm)
