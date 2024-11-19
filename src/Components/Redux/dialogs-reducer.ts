import { InferActionsTypes } from "./redux-store";

type DialogType = {
    id: number,
    name: string
}
type MessageType = {
    message: string
}

let initialState = {
    dialogsData: [
        {id: 1, name: "Alex"},
        {id: 2, name: "Pavel"},
        {id: 3, name: "Smith"},
        {id: 4, name: "Jon"},
    ] as Array<DialogType>,
    messagesData: [
        {message: "Hello"},
        {message: "Good bay!"},
    ] as Array <MessageType>
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type){
         
        case 'dialgs/ADD-NEW-MESSAGE': 
            let body = action.newMessageText;
            return {
                ...state,
                messagesData: [...state.messagesData, {message: body}]
            };
        default:
            return state;
    }
    
}

export default dialogsReducer;


export const actions = {
    addMessage: (newMessageText: string) => ({type: 'dialgs/ADD-NEW-MESSAGE', newMessageText})
}


