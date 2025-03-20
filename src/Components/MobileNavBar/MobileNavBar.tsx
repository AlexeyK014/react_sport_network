import React from 'react'
//@ts-ignore
import style from './MobileNavBar.module.css'
//@ts-ignore
import imgProfile from '../../../src/img/profile-white.svg'
//@ts-ignore
import imgUsers from '../../../src/img/friends-white.svg'
//@ts-ignore
import imgChat from '../../../src/img/chat-white.svg'
//@ts-ignore
import imgNews from '../../../src/img/news-white.svg'
//@ts-ignore
import imgTarget from '../../../src/img/target-white.svg'
import { NavLink } from 'react-router-dom'
import { useSetAuthQuery } from '../../reduxToolkit/auth/slice.ts'

const MobileNavBar = () => {
    //@ts-ignore
        const { userId, loginUser } = useSetAuthQuery('authUser', {
            selectFromResult: ({ data }) => ({
                userId: data?.userId,
                loginUser: data?.loginUser,
                resultCode: data?.resultCode
            })
        })

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
                    <NavLink to={'/targets'} className={style.itemMenu}>
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