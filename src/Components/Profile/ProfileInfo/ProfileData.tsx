import React, { useEffect } from "react"
import { ProfileDataType, ProfileType } from "../../../Types/Types"
import { Params } from "react-router-dom"
//@ts-ignore
import style from './ProfileInfo.module.css'
import { useGetProfileQuery } from "../../../reduxToolkit/profile/slice.ts"


const ProfileData: React.FC<ProfileDataType> = ({
  profile,
  userId,
  id,
  goToEditeMode
}) => {

  const { isLoading, isError } = useGetProfileQuery(id ?? -1)

  // Если id равен null, показываем сообщение
  if (id === null) {
    return <div>ID профиля не указан</div>;
  }
  // Если данные загружаются, показываем заглушку
  if (isLoading) {
    return <div>Загрузка...</div>
  }

  // Если произошла ошибка, показываем сообщение об ошибке
  if (isError) {
    return <div>Ошибка загрузки данных</div>
  }

  // Если данные профиля не загружены, показываем заглушку
  if (!profile) {
    return <div>Данные профиля отсутствуют</div>
  }

  // Если userId не определен, показываем сообщение
  if (!userId) {
    return <div>Пользователь не авторизован</div>
  }

  return (
    <div className={style.profilePageBlock}>
      <div className={style.titlePage}>
        <h2 className={style.mainTitle}>О спортсмене</h2>
      </div>


      <div className={style.point}>
        <span>{profile.fullName}</span>
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
        {+userId === +id &&
          <button
            onClick={goToEditeMode}
          >Изменить</button>}
      </div>

    </div>
  )
}

export default ProfileData
