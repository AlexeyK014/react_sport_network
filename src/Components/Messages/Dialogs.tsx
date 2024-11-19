import React from "react";
//@ts-ignore
import style from './Dialogs.module.css'
import DialogItem from "./DialogsItem/DialogItem.tsx";
import MessageItem from "./MessageItem/MessageItem.tsx";
import { DialogsReduxForm } from "./DialogsForm.tsx";
import { InitialStateType } from "../Redux/dialogs-reducer";
import { DialogType, MessageType } from "../../Types/Types";



type DailogsFormValuesType = {
    dialogs: InitialStateType
    addMessage: (messageText: string) => void 
    dialogsData: Array<DialogType>
    messagesData: Array<MessageType>
}

type PropsType = {}

export type NewMessageFormType = {
    newMessageText: string
}

const Dialogs: React.FC<NewMessageFormType & PropsType & DailogsFormValuesType> = (props) => {
    let state = props.dialogs

    ///////////  Получаем диалоги и сообщения  ////////////    
    let dialogsElement = state.dialogsData.map( (dialog) => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id}/>)
    let messagesElement = state.messagesData.map( (message) => <MessageItem message = {message.message} key={message.id}/>)

   

    let addMessage = (values: NewMessageFormType) => {
        props.addMessage(values.newMessageText)
    }


    return (
            <div className={style.dialogs}>
                <div className={style.dialogsItem}>
                    {dialogsElement} 
                </div>


                <div className={style.messagesItem}>
                    {messagesElement}
                    
                    <div>
                        <DialogsReduxForm onSubmit={addMessage} />
                        
                    </div>
                </div>


            </div>
        )
}

export default Dialogs