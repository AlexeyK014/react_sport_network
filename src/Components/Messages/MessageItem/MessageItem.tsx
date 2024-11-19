import React from "react"
//@ts-ignore
import style from './../Dialogs.module.css';

type PropsType = {
    message: string
}
const MessageItem: React.FC<PropsType> = ({message}) => {
    return <div>
        <div className={style.message}>{message}</div>
    </div>
}

export default MessageItem