import React, { useEffect } from "react";
//@ts-ignore
import style from './Users.module.css';
//@ts-ignore
import avaUsers from '../../img/avaUsers.png';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserPropsType } from "../../Types/Types";

let User: React.FC<UserPropsType> = ({
    user,
    refetch,
    follow,
    unfollow, 
}) => {
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/users') {
            navigate({
                pathname: '/users',
            })
        } 
    }, [])

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
                        {/* {isLoading && <p>Загрузка...</p>} */}
                        {user.followed === true
                            ? <button
                                className={style.unFollowBtn}
                                onClick={async() =>{
                                    await unfollow({ ...user, followed: !user.followed });
                                    refetch()
                                }}
                            >
                                Unfollow
                            </button>
                            : <button
                                className={style.followBtn}
                                id={`${user.id}`}
                                onClick={async() =>{
                                    await follow({ ...user, followed: !user.followed });
                                    refetch()
                                }}
                            >
                                Follow
                            </button>
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
