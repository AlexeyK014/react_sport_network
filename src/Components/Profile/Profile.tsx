import React from "react";
import { PropsType } from "../../Types/Types";
import { Blog } from "../Blog/Blog.tsx";
import ProfileInfo from "./ProfileInfo/ProfileInfo.tsx";
import { Params } from "react-router-dom";
import MyPosts from "./MyPosts/MyPosts.tsx";





export let Profile: React.FC<PropsType & Params> = ({profile, userId}) => {  
    return(
        <div>
            <ProfileInfo
                profile={profile}
                //@ts-ignore
                userId={userId}
                />
            <Blog />
        </div>
    )
}

