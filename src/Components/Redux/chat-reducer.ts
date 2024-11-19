
import { BaseThunkType, InferActionsTypes } from "./redux-store.ts";
import { ChatMessageAPIType, ChatMessageType, StatusType, chatAPI } from "../API/chat-api.ts";
import { Dispatch } from "redux";
import {v1} from 'uuid'


export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>


let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType,
}
type ChatMessageType = ChatMessageAPIType & {id: string}

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type){
        case 'SN/chat/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))].filter((m, index, array) => index >= array.length - 100)
            } 
        case 'SN/chat/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            } 
        default:
            return state;
    }
}

export default chatReducer;

//// ACTION CREATOR ////

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({type: 'SN/chat/MESSAGES_RECEIVED', payload: {messages}} as const),
    statusChanged: (status: StatusType) => ({type: 'SN/chat/STATUS_CHANGED', payload: {status}} as const) 
}


////////////////////////////


                            /////////  Thunk  /////////

///////////////   Получаем данные профиля   ////////////////


let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if(_newMessageHandler === null){
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if(_statusChangedHandler === null){
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}
    

export const startMessagesListening = (): ThunkType => {
    return async(dispatch) => {
        chatAPI.start()
        chatAPI.subscride('message-received', newMessageHandlerCreator(dispatch))
        chatAPI.subscride('status-changed', statusChangedHandlerCreator(dispatch))
       
    }
}

export const stopMessagesListening = (): ThunkType => {
    return async(dispatch) => {
        chatAPI.unsubscribe('message-received', newMessageHandlerCreator(dispatch))
        chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
        chatAPI.stop()
    }
}

export const sendMessage = (message: string): ThunkType => {
    return async(dispatch) => {
        chatAPI.sendMessage(message);
    }
}
