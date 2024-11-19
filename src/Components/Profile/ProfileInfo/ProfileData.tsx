import React from "react"
import { ProfileDataType } from "../../../Types/Types"
import { Params } from "react-router-dom"
//@ts-ignore
import style from './ProfileInfo.module.css'


const ProfileData: React.FC<ProfileDataType & Params> = ({profile, userId, userIdState, goToEditeMode}) => {
  console.log(userId);
  
    return (
      <div className={style.profilePageBlock}>
        <div className={style.titlePage}>
          <span className={style.lineTitle}></span>
          <h2 className={style.mainTitle}>О спортсмене</h2>
          <span className={style.lineTitle}></span>
        </div>
  
  
        <div className={style.point}>
          <b>Имя:</b> <span>{profile.fullName}</span>
        </div>
        <div>
          <b>Есть ли опыт занятий спортом:</b> <span>{profile.lookingForAJob ? 'yes' : 'no'}</span>
        </div>
        <div>
          <b>Мой любимый вид спорта: </b> <span>{profile.lookingForAJobDescription}</span>
        </div>
        <div>
          <b>Немного про меня:</b> <span>{profile.aboutMe}</span>
        </div>
        <div>
          {+userId === userIdState && <button onClick={goToEditeMode}>Изменить</button>}
        </div>
  
      </div>
    )
}

export default ProfileData
