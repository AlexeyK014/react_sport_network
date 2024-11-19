import { BaseThunkType, InferActionsTypes } from './redux-store';
import { UserType } from "../../Types/Types";
import { Dispatch } from 'redux';
import { usersAPI } from '../API/users-api.ts';
import { APIResponseType } from '../API/api.ts';


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    filter: {
        term: "",
        friend: null as null | boolean
    },
    followingInProgress: [] as Array<number>    // массив пользователй
    // храними в массиве. В массив помещаем id, того пользователя на которого подписываемся или отписываемся
}

export type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;


const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "users/FOLLOW":
            return {
                ...state,
                users: [...state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u
                })]
            }
        case 'users/UNFOLLOW':
            return {
                ...state,
                users: [...state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u
                })]
            }
        case "users/SET_USERS": {
            return { ...state, users: action.users }
        }
        case "users/SET_CURRENT_PAGE": {
            return { ...state, currentPage: action.currentPage }
        }
        case "users/SET_TOTAL_USERS_COUNT": {
            return { ...state, totalUsersCount: action.count }
        }
        case "users/TOGGLE_IS_FETCHING": {
            return { ...state, isFetching: action.isFetching }
        }
        case "users/TOGGLE_IS_FOLLOWING_PROGRESS": {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            } // если false. пропускаем ту id, которая пришла к нам в action
        }
        case "users/SET_FILTER": {
            return { ...state, filter: action.payload }
        }
        default:
            return state;
    }

}

export default usersReducer;

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {   // ключ - значение(выводимый тип)
    followSuccsess: (userId: number) => ({ type: "users/FOLLOW", userId } as const),
    unfollowSuccsess: (userId: number) => ({ type: "users/UNFOLLOW", userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: "users/SET_USERS", users } as const),
    setCurrentPage: (currentPage: number) => ({ type: "users/SET_CURRENT_PAGE", currentPage } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: "users/SET_TOTAL_USERS_COUNT", count: totalUsersCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: "users/TOGGLE_IS_FETCHING", isFetching } as const),
    toggleFollowingInProgress: (isFetching: boolean, userId: number) => ({ type: "users/TOGGLE_IS_FOLLOWING_PROGRESS", isFetching, userId } as const),
    setFiter: (filter: FilterType) => ({ type: "users/SET_FILTER", payload: filter } as const)
}

///////////////////////  Thunk   /////////////////////////////

type ThunkType = BaseThunkType<ActionsTypes>;

export const getUsersTC = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch, getState) => {
        // getState()
        dispatch(actions.toggleIsFetching(true));


        let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.setFiter(filter));
        dispatch(actions.setTotalUsersCount(data.totalCount));
        dispatch(actions.toggleIsFetching(false));

    }
}


// для внутреннего использования
const _followunfollowFlow = async (dispatch: Dispatch<ActionsTypes>,
    userId: number,
    apiMethod: (userId: number) => Promise<APIResponseType>,
    actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingInProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingInProgress(false, userId));
    dispatch(actionCreator(userId))
}

export const followTC = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.follow.bind(usersAPI);
        let actionCreator = actions.followSuccsess;
        await _followunfollowFlow(dispatch, userId, apiMethod, actionCreator);
    };
};

export const unfollowTC = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.unfollow.bind(usersAPI);
        let actionCreator = actions.unfollowSuccsess;
        await _followunfollowFlow(dispatch, userId, apiMethod, actionCreator);
    };
};
