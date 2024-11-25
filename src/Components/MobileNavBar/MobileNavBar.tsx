import React from 'react'
//@ts-ignore
import style from './MobileNavBar.module.css'
import imgProfile from '../../../src/img/profile.svg'
import imgUsers from '../../../src/img/users.svg'
import imgChat from '../../../src/img/chat.svg'
import imgNews from '../../../src/img/news.svg'
import imgTarget from '../../../src/img/target.svg'
import { NavLink, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppStateType } from '../Redux/redux-store'

const MobileNavBar = () => {
    const userId = useSelector((state: AppStateType) => state.auth.userId);

    return (
        <div className={style.navbarBlog}>
            <div className={style.navbar}>
                <div>
                    <NavLink to={`/profile/${userId}`} className={style.itemMenu}>
                        <img src={imgProfile}/>
                        <div className={style.titleMenu}>Профайл</div>
                    </NavLink>
                    
                </div>
                <div>
                    <NavLink to={'/users'} className={style.itemMenu}>
                        <img src={imgUsers}/>
                        <div className={style.titleMenu}>Пользователи</div>
                    </NavLink>
                    
                </div>
                <div>
                    <NavLink to={'/myaims'} className={style.itemMenu}>
                        <img src={imgTarget}/>
                        <div className={style.titleMenu}>Мои цели</div>
                    </NavLink>
                    
                </div>
                <div>
                    <NavLink to={'/chat'} className={style.itemMenu}>
                        <img src={imgChat}/>
                        <div className={style.titleMenu}>Чат</div>
                    </NavLink>
                    
                </div>
                <div>
                    <NavLink to={'/news'} className={style.itemMenu}>
                        <img src={imgNews}/>
                        <div className={style.titleMenu}>Новости</div>
                    </NavLink>
                    
                </div>
            </div>
        </div>
    )
}

export default MobileNavBar