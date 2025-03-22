import React, { useEffect, useRef, useState } from "react";
//@ts-ignore
import style from './ChatPage.module.css'
// import { ChatMessageAPIType } from "../API/chat-api";
import { useDispatch } from "react-redux";
// import { sendMessage, startMessagesListening, stopMessagesListening } from "../Redux/chat-reducer.ts";
import { useSelector } from "react-redux";
import { AppStateType } from "../Redux/redux-store";
import { AnyAction } from "redux";
import { message } from "antd";


export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}
export type StatusType = 'pending' | 'ready' | 'error'


const ChatPage: React.FC = () => {
    return <div>

        <div className={style.fonChat}>
        </div>
        <Chat />
    </div>
}

const Chat: React.FC = () => {
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket;
        const closeHandler = () => {
            createChannel();
        }
        function createChannel() {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()

            ws = new WebSocket('https://social-network.samuraijs.com/handlers/ChatHandler.ashx');
            ws?.addEventListener('close', closeHandler)
            setWsChannel(ws)
        }
        createChannel();

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])


    return <div className={style.chat}>
        <Messages wsChannel={wsChannel} />
        <AddMessageForm wsChannel={wsChannel} />
    </div>
}

const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    //делаем синхронизацию
    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
            console.log(JSON.parse(e.data));
        }
        wsChannel?.addEventListener('message', messageHandler)

        // делаем рассинхронизацию, зачищаем
        return () => {
            wsChannel?.removeEventListener('message', messageHandler)
        }
    }, [wsChannel])
    // const messages = useSelector((state: AppStateType) => state.chat.messages);
    const messageAncorRef = useRef<HTMLDivElement>(null) // для автоскролла
    const [isAutoScroll, setautoScrollIs] = useState<boolean>(true)
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
            messageAncorRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
        //@ts-ignore
    }, [messages] as unknown as AnyAction)

    return <div style={{ height: '510px', overflow: 'auto', marginTop: '30px', marginLeft: '30px' }} onScroll={scrollHandler}>
        {messages.map((m, index) => <Message key={index} message={m} />)}

        {/* messageAncorRef - для автоскролла */}
        <div ref={messageAncorRef}></div>
    </div>
}

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
    return <div className={style.messageBlock}>
        <img src={message.photo} />
        <div className={style.message}>
            <div className={style.userNameChat}>{message.userName}</div>
            <div className={style.messageChat}>
                {message.message}
            </div>
        </div>

    </div>
}




const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
    const [message, setMessage] = useState('');
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>();

    useEffect(() => {
        let openHandler = () => {
            setReadyStatus('ready')
        }
        wsChannel?.addEventListener('open', openHandler)
        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel])


    const sendMessageHandler = () => {

        if (!message) {
            return;
        }
        wsChannel?.send(message)
        setMessage('');
    }
    return <div className={style.chatForm}>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message} />
        </div>
        <div>
            <button onClick={sendMessageHandler} disabled={wsChannel === null || readyStatus !== 'ready'}>Send</button>
        </div>
    </div>
}

export default ChatPage