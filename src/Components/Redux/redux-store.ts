import { Action, applyMiddleware, combineReducers, legacy_createStore } from "redux";
import profileReducer from './profile-reducer.ts';
import dialogsReducer from './dialogs-reducer.ts';
import usersReducer from "./users-reducer.ts";
import authReducer from "./auth-reducer.ts";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import appReducer from "./app-reducer.ts";
import chatReducer from "./chat-reducer.ts";
import myAim from "./myaims-reducer.ts";

let rootReducers = combineReducers({
    profilePage: profileReducer,
    dialogs: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer,
    aimPage: myAim
});

type RootReducerType = typeof rootReducers; 
export type AppStateType = ReturnType<RootReducerType>
type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsTypes<T extends {[key: string]:  (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>;



let store = legacy_createStore(rootReducers, applyMiddleware(thunkMiddleware));

//@ts-ignore
window.store = store;

export default store;