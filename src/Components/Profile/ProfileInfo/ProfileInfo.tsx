import React, { ChangeEvent, useState } from "react";
//@ts-ignore
import style from './ProfileInfo.module.css'
import ProfileStatusHOOKS from "./ProfileStatusHOOKS.tsx";
import Preloader from "../../common/Preloader/Preloader.tsx";
import ProfileFormik from "./ProfileFormik.tsx";
import { PhotosType, PropsType } from "../../../Types/Types.ts";
import { useSelector } from "react-redux";
import { AppStateType } from "../../Redux/redux-store.ts";
import { Params } from "react-router-dom";
import { useDispatch } from "react-redux";
import { savePhoto } from "../../Redux/profile-reducer.ts";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
//@ts-ignore
import userProfile from '../../../img/avaUsers.png'
import ProfileData from "./ProfileData.tsx";



type State = { photos: PhotosType };
type AppDispatch = ThunkDispatch<State, any, AnyAction>;


const ProfileInfo: React.FC<PropsType & Params> = ({profile, userId}) => {
  const dispatch: AppDispatch = useDispatch();
  const status = useSelector((state: AppStateType) => state.profilePage.status);
  const userIdState = useSelector((state: AppStateType) => state.auth.userId);
  let [editeMode, setEditeMode] = useState<boolean>(false);

  const goToEditeMode = () => {
    setEditeMode(true)
  }


  if (!profile) {
    return <Preloader />
  }


  const savePhotoUser = (photos: PhotosType) => {
    dispatch(savePhoto(photos) as unknown as AnyAction)
  }

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      //@ts-ignore
      savePhotoUser(e.target.files[0])
    }
  }

  return (
    <div className={style.profilePage}>
      <div className={style.blogTop}>
        <div className={style.blogTopLeft}>
          <div className={style.slogan}>
            <p className={style.sloganText}>
              Никогда не сдавайся!
            </p>
            <div className={style.changePhoto}>
              {+userId === userIdState &&
                <div>
                  <input onChange={onMainPhotoSelected} name="file" type="file" id="input__file" className={style.input__file} multiple />
                  <label htmlFor="input__file" className={style.inputFileButton}>
                    <span className={style.inputFileButtonText}>Поменять аватар</span>
                  </label>
                </div>
              }
            </div>
          </div>



          <div className={style.line}>
          </div>
        </div>

        <div className={style.blogTopRight}>
          <div className={style.quote}>
            <blockquote>
              <ProfileStatusHOOKS status={status} />
            </blockquote>
          </div>
          <img src={profile.photos.large || userProfile} alt="profileFoto" className={style.mainPhoto} />
        </div>
      </div>


      <div className={style.profileData}>
        {editeMode
        //@ts-ignore
          ? <ProfileFormik profile={profile} exitToEditForm={() => { setEditeMode(false) }} goToEditeMode={goToEditeMode} />
          //@ts-ignore
          : <ProfileData userId={userId} userIdState={userIdState} profile={profile} goToEditeMode={goToEditeMode} />
        }
      </div>


    </div>
  )
}
export default ProfileInfo;








