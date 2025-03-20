import React, { useEffect, useState } from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo.tsx";
import { useParams } from "react-router-dom";
import { useGetProfileQuery, useUpdatedProfileMutation } from "../../reduxToolkit/profile/slice.ts";
import { useSetAuthQuery } from "../../reduxToolkit/auth/slice.ts";
//@ts-ignore
import style from './Profile.module.css';


export let Profile: React.FC = () => {

    let { id } = useParams<{ id: string }>();

    const [skipProfile, setSkipProfile] = useState<boolean>(true);
    const { data, refetch } = useGetProfileQuery(id ? Number(id) : 0, {
        refetchOnMountOrArgChange: true,
        skip: skipProfile
    });

    const [updatedProfile] = useUpdatedProfileMutation();

    //@ts-ignore
    const { userId } = useSetAuthQuery('authUser', {
        // skip: skipAuth,
        selectFromResult: ({ data }) => ({
          userId: data?.userId,
          loginUser: data?.loginUser,
          resultCode: data?.resultCode
        })
      })

    useEffect(() => {
        if (id) {
            setSkipProfile(false)
        } else if (!id) {
            setSkipProfile(true)
        }
    }, [id, data])



    return (
        <>
            <div className={style.profile}>
                <ProfileInfo
                    profile={data}
                    userId={userId}
                    id={id ? Number(id) : null}
                    //@ts-ignore
                    updatedProfile={updatedProfile}
                    refetch={refetch}
                />
            </div>
        </>
    )
}