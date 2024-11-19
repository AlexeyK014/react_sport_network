import React from "react";
import { InferActionsTypes } from "./redux-store";
import { string } from "yup";

type AimType = {
    aim: string,
    description: string
}

let initialState = {
    aimsData: [
        {aim: "Кросс 5 км", description: "Пробежить кросс в легком темпе. Средний пульс 130 уд/мин"},
        {aim: "Силовая тренировка", description: ""},
    ] as Array <AimType>,
    newAimBody: '',
    newDescriptionBody: ''
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const myAim = (state = initialState, action: ActionsType) => {
    switch(action.type){
         
        case 'result/ADD_NEW_AIM':
            let newAim = {
                aim: action.newAimBody,
                description: action.newDescriptionBody,
            };
            return {
                ...state,
                aimsData: [...state.aimsData, newAim],
                newAimBody: '',
                newDescriptionBody: '',
            };  
        default:
            return state;
    }
}

export default myAim

export const actions = {
    addAim: (newAimBody: string, newDescriptionBody: string) => ({type: 'result/ADD_NEW_AIM', newAimBody, newDescriptionBody})
}