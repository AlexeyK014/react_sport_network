import React from "react";
import style from './Navbar.module.css'
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../Redux/profile-reducer.ts";
import { AnyAction } from "redux";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { AppStateType } from "../Redux/redux-store.ts";

const Navbar: React.FC = () => {
    
    const userId = useSelector((state: AppStateType) => state.auth.userId);
    return(
        <nav className={style.navbar}>
                <div className={style.item}>
                    <NavLink to={`/profile/${userId}`} className={navData => navData.isActive ? style.active : style.item}>Профайл</NavLink>
                </div>
                <div className={style.item}>
                    <NavLink to={"/users"} className={navData => navData.isActive ? style.active : style.item}>Пользователи</NavLink>
                </div>
                <div className={style.item}>
                    <NavLink to={"/dialogs"} className={navData => navData.isActive ? style.active : style.item}>Сообщения</NavLink>
                </div>
                <div className={style.item}>
                    <NavLink to={"/news"} className={navData => navData.isActive ? style.active : style.item}>Новости</NavLink>
                </div>
                <div className={style.item}>
                    <NavLink to={"/train"} className={navData => navData.isActive ? style.active : style.item}>Train</NavLink>
                </div>
                
        </nav>
    )
}

export default Navbar;