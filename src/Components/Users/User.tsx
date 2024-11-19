import React from "react";
//@ts-ignore
import style from './Users.module.css';
//@ts-ignore
import avaUsers from '../../img/avaUsers.png';
import { NavLink } from "react-router-dom";
import { UserPropsType } from "../../Types/Types";

let User: React.FC<UserPropsType> = ({ user, followingInProgress, unfollowTC, followTC }) => {

    return (
        <div className={style.userPage}>
            <span className={style.user}>
                <span>
                    <NavLink to={'/profile/' + user.id}>
                        <img alt="userPhoto" src={user.photos.small != null ? user.photos.small : avaUsers} className={style.userPhoto} />
                    </NavLink>
                </span>



                <span className={style.info}>
                    <div className={style.infoLeft}>
                        <span className={style.nameUsers}>{user.name}</span>

                        {user.followed
                            ? <button className={style.unFollowBtn} disabled={followingInProgress.some(id => id === user.id)} // some - если хоть одна id равна id  пользователя
                                onClick={() => { unfollowTC(user.id) }}>Unfollow</button>
                            : <button className={style.followBtn} disabled={followingInProgress.some(id => id === user.id)}
                                onClick={() => { followTC(user.id) }}>Follow</button>
                        }
                    </div>

                    <div className={style.infoRight}>
                        {user.followed
                            ? <span>Вы подписаны</span>
                            : ''
                        }
                    </div>


                </span>
            </span>


        </div>)

}

export default User;
