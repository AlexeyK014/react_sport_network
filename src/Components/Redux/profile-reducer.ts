import { PhotosType, PostDataType, ProfileType } from "../../Types/Types";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./redux-store";
import { profileAPI } from "../API/profile-api.ts";



let initialState = {
    postData: [
        { id: 1, post: "Привет", like: 0, idLike: 0 },
        { id: 2, post: "Как дела?", like: 0, idLike: 0 },
    ] as Array<PostDataType>,
    profile: null as ProfileType | null,
    status: "",
    newPostText: '',
}

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'profile/ADD-POST':
            let newPost = {
                id: 3,
                post: action.newPostText,
                like: 0,
                idLike: 0
            };
            return {
                ...state,
                postData: [...state.postData, newPost],
                newPostText: ''
            };

        case 'profile/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            };
        case 'profile/SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'profile/DELETE_POST':
            return {
                ...state,
                postData: state.postData.filter(p => p.id !== action.postId)
            }
        case 'profile/SAVE_PHOTO_SACCESS':
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
            }
        default:
            return state;
    }



}

export default profileReducer;



export const actions = {
    addPost: (newPostText: string) => ({ type: 'profile/ADD-POST', newPostText } as const),
    setUserProfile: (profile: ProfileType) => ({ type: 'profile/SET_USER_PROFILE', profile } as const),
    setStatusProfile: (status: string) => ({ type: 'profile/SET_STATUS', status } as const),
    deletePost: (postId: number) => ({ type: 'profile/DELETE_POST', postId } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: 'profile/SAVE_PHOTO_SACCESS', photos } as const),
}


///////////////////////////////  Thunk  ///////////////////////////////////////

type GetStateType = () => AppStateType;


export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data));
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatusProfile(data));
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(actions.setStatusProfile(status))
    }
}

export const savePhoto = (photos: PhotosType): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(photos);
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfileTC = (profile: ProfileType): ThunkType => async (dispatch,
    getState: GetStateType) => {
    const userId = getState().auth.userId;
    let data = await profileAPI.saveProfile(profile);
    if (data.resultCode === 0) {
        console.log(data);

        if (userId != null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error("userId can't be null")
        }
    }
}


