import { ThunkAction } from "redux-thunk";
import { getAuthUserData } from "./auth-reducer.ts";
import { AppStateType, InferActionsTypes } from "./redux-store.ts";



let initialState = {
    initialized: false
}
export type InitialStateType = typeof initialState // применяем автоматическкую типизацию
type ActionsType = InferActionsTypes<typeof actions>


const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type){
        case 'app/SET_INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            } 
        default:
            return state;
    }
}

export default appReducer;

//// ACTION CREATOR ////

export const actions = {
    initializedSuccess: () => ({type: 'app/SET_INITIALIZED_SUCCESS'} as const) 
}


////////////////////////////


                            /////////  Thunk  /////////

///////////////   Получаем данные профиля   ////////////////

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const initializeApp = (): ThunkType => {
    return async(dispatch) => {
        let promise = dispatch(getAuthUserData());
        Promise.all([promise])   // дожидаемся всех пареллельных запросов
            .then(() => {
                dispatch(actions.initializedSuccess());
        });
       
    }
}
