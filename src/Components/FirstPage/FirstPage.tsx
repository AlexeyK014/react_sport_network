import React from 'react'
import { NavLink } from 'react-router-dom'
//@ts-ignore
import style from './FirstPage.module.css'

const FirstPage = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.firstPage}>
        <p className={style.titleOne}>
          Место спорта и здорового образа жизни
        </p>
        <span className={style.title}>
          <span className={style.line}></span>
          ТВОЙ СПОРТ
          <span className={style.line}></span>
        </span>

        <p className={style.titleOne}>
          Для спотрсменов и тренеров
        </p>

        <p className={style.subscribe}>
          Присоединяйся!
        </p>

        
      </div>
      <div className={style.loginBlock}>
          <NavLink to={'/login'}  className={style.loginBtn}>Вход</NavLink>
        </div>
    </div>
  )
}

export default FirstPage