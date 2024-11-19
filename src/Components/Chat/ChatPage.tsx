import React, { useEffect, useRef, useState } from "react";
//@ts-ignore
import style from './ChatPage.module.css'
import { ChatMessageAPIType } from "../API/chat-api";
import { useDispatch } from "react-redux";
import { sendMessage, startMessagesListening, stopMessagesListening } from "../Redux/chat-reducer.ts";
import { useSelector } from "react-redux";
import { AppStateType } from "../Redux/redux-store";
import { AnyAction } from "redux";
//@ts-ignore
import fonChat from '../../img/fonChat1.jpg'


const ChatPage: React.FC = () => {
    return <div>
        <div className={style.fonChat}>
            <h1>Чат</h1>
            <img src={fonChat} className={style.fonImg} />
        </div>
        <Chat />
    </div>
}

const Chat: React.FC = () => {
    const dispatch = useDispatch();
    const status = useSelector((state: AppStateType) => state.chat.status);

    useEffect(() => {
        dispatch(startMessagesListening() as unknown as AnyAction);
        return () => {
            dispatch(stopMessagesListening() as unknown as AnyAction)
        }
    }, [])

    return <div>
        {status === 'error' && <div>Some error occured. Please refresh page.</div>}

        <Messages />
        <AddMessageForm />
    </div>
}

const Messages: React.FC<{}> = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages);
    const messageAncorRef = useRef<HTMLDivElement>(null) // для автоскролла
    const [isAutoScroll, setautoScrollIs] = useState<boolean>(true);
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 400) {
            !isAutoScroll && setautoScrollIs(true)
        } else {
            isAutoScroll && setautoScrollIs(false)
        }
    }

    // если из useSelector достаём новый массив, значит надо сделать перемотку
    useSelector(() => {
        if (isAutoScroll) {
            messageAncorRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
        //@ts-ignore
    }, [messages] as unknown as AnyAction)

    return <div className={style.message} onScroll={scrollHandler}>
        {messages.map((m, index) => <Message key={m.id} message={m} />)}

        {/* messageAncorRef - для автоскролла */}
        <div ref={messageAncorRef}></div>
    </div>
}


const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({ message }) => {

    return <div className={style.chat}>
        <div>
            <img src={message.photo} />
        </div>

        <div className={style.messageBlock}>
            <span className={style.chatName}>{message.userName}</span>
            <div className={style.chatMessage}>{message.message}</div>

        </div>

    </div>
})



const AddMessageForm: React.FC<{}> = () => {
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    const status = useSelector((state: AppStateType) => state.chat.status);


    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message) as unknown as AnyAction);
        setMessage('');
    }
    return <div className={style.chatForm}>
        <span>
            <textarea className={style.textareaChat} onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
        </span>

        <span>
            <button className={style.btnChat} disabled={status !== 'ready'} onClick={sendMessageHandler}>Отправить</button>
        </span>
    </div>
}

export default ChatPage