import React, { useEffect, useState } from "react";
//@ts-ignore
import style from './ProfileAdap.module.css'
import ProfileStatusHOOKS from "./ProfileStatus/ProfileStatusHOOKS.tsx";
import Preloader from "../../common/Preloader/Preloader.tsx";
import ProfileFormik from "./ProfileFormik.tsx";
import ProfileData from "./ProfileData.tsx";
import { Blog } from "../Blog/Blog.tsx";
import { useUpdatedProfileMutation } from "../../../reduxToolkit/profile/slice.ts";
import ProfilePhoto from "./ProfilePhoto.tsx";
import { ProfileInfoType } from "../../../Types/Types.ts";


const ProfileAdap: React.FC<ProfileInfoType> = ({
  profile,
  id,
  userId,
  refetch
}) => {
  let [editeMode, setEditeMode] = useState<boolean>(false);
  const [updatedProfile, { isLoading }] = useUpdatedProfileMutation();

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => {
      const windowInnerWidth = event.target.innerWidth
      setWidth(windowInnerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const goToEditeMode = () => {
    setEditeMode(true)
  }


  if (!profile) {
    return <Preloader />
  }

  return (
    <div className={style.profilePage}>
      <div className={style.profileAdapTop}>
        <div className={style.blogRightTop}>
          <div className={style.quote}>
              <ProfileStatusHOOKS userId={userId} id={id} />
          </div>

          <ProfilePhoto />

        </div>

        <div className={style.profileData}>
          {editeMode
            ? <ProfileFormik
              profile={profile}
              exitToEditForm={() => { setEditeMode(false) }}
              //@ts-ignore
              updatedProfile={updatedProfile}
              isLoading={isLoading}
              refetch={refetch}
            />
            :
            <ProfileData
              profile={profile}
              id={id}
              userId={userId}
              goToEditeMode={goToEditeMode}
            />
          }
        </div>
      </div>

      <div>
        {userId !== null && id !== null && +userId === +id
          ? (
            <div className={style.blog}>
              <Blog userId={userId} />
            </div>
          )
          : (
            <div className={style.notBlog}>
              <p>Пользователь не ведет блог</p>
              <p>...</p>
            </div>
          )

        }
      </div>
    </div>


  )
}
export default ProfileAdap;
