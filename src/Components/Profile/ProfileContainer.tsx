import React, { useEffect, useRef } from "react";
import { Profile } from "./Profile.tsx";
import { getUserProfile, getStatus } from "../Redux/profile-reducer.ts";
import { useParams } from "react-router-dom";
import { AnyAction } from "redux";
import { AppStateType } from "../Redux/redux-store.ts";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { withAuthRedirect } from "../../HOC/withAuthRedirect.tsx";
import { ThunkDispatch } from "redux-thunk";
//@ts-ignore
import style from './Profile.module.css'
import { getIsFetching } from "../Redux/users-selector.ts";

type Params = {
    userId: string | undefined;
}
type State = { userId: string };
type AppDispatch = ThunkDispatch<State, any, AnyAction>;




export const ProfielPage: React.FC = () => {
    const isFetching = useSelector(getIsFetching);
    const profile = useSelector((state: AppStateType) => state.profilePage.profile);
    const authorizedUserId = useSelector((state: AppStateType) => state.auth.userId);
    const dispatch: AppDispatch = useDispatch();
    let { userId } = useParams<Params>()



    const refereshProfile = () => {
        if (!userId) {
            let userId = authorizedUserId;
            console.log(userId);
        }
        if (!userId) {
            console.log("ID shoud exists in URL params or in state('autorizedUserId')");
        }
        else {
            //@ts-ignore
            dispatch(getUserProfile(userId) as unknown as AnyAction);
            //@ts-ignore
            dispatch(getStatus(userId) as unknown as AnyAction);
        }
        console.log(authorizedUserId);

    }

    useEffect(() => {
        //@ts-ignore
        refereshProfile() as unknown as AnyAction
    }, [userId]);


    const prevUser = useRef<HTMLDivElement>();

    useEffect(
        () => {
            if (prevUser.current !== userId) {
                refereshProfile()
            }
        }, [userId]
    )



    return <div className={style.profile}>
        <Profile
            userId={userId}
            profile={profile}
        />
    </div>
}
export const EnchancedProfielPage = withAuthRedirect(ProfielPage)