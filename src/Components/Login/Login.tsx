import React from "react";
//@ts-ignore
import style from './Login.module.css';
import LoginFormik from "./LoginFormik.tsx";


export const Login: React.FC = () => {

    return (
        <div className={style.wrapper}>
            <div className={style.loginPage}>
                <p className={style.titleOne}>
                    Место спорта и здорового образа жизни
                </p>
                <span className={style.title}>
                    <span className={style.line}></span>
                    ТВОЙ СПОРТ
                    <span className={style.line}></span>
                </span>

                <p className={style.titleOne}>
                    Для спортсменов и тренеров
                </p>

                <p className={style.subscribe}>
                    Присоединяйся
                </p>


                <div className={style.loginBlock}>
                    <div>
                        <LoginFormik />
                    </div>
                </div>
            </div>
        </div>
    )
}


