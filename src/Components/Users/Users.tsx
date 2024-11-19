import React, { useEffect } from "react";
import Paginator from "../common/Paginator/Paginator.tsx";
import User from "./User.tsx";
import UsersFormSearch from "./UsersSearchForm.tsx";
import { FilterType, followTC, getUsersTC, unfollowTC } from "../Redux/users-reducer.ts";
import { useSelector } from "react-redux";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from "../Redux/users-selector.ts";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { withAuthRedirect } from "../../HOC/withAuthRedirect.tsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import Preloader from "../common/Preloader/Preloader.tsx";
//@ts-ignore
import style from './Users.module.css'
//@ts-ignore
import fonUsers from '../../img/ФонОбщи2.jpg'

type PropsType = {}

let Users: React.FC<PropsType> = () => {
    const totalUsersCount = useSelector(getTotalUsersCount);
    const pageSize = useSelector(getPageSize);
    const currentPage = useSelector(getCurrentPage);
    const users = useSelector(getUsers);
    const filter = useSelector(getUsersFilter);
    const followingInProgress = useSelector(getFollowingInProgress);
    const isFetching = useSelector(getIsFetching)

    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(getUsersTC(currentPage, pageSize, filter) as unknown as AnyAction)
    }, [])

    const [searchParams, setSearchParams] = useSearchParams();


    useEffect(() => {    // синхронизация URL - адреса. Синхронизация должна запускать когда приходит различный фильтр
        navigate({
            pathname: '/users',
            search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })
    }, [filter, currentPage])

    useEffect(() => {

        const term = filter.term
        const friend = filter.friend

        let urlQuery =
            (term === '' ? '' : `&term=${filter.term}`)
            + (friend === null ? '' : `&friend=${friend}`)
            + (currentPage === 1 ? '' : `&page=${currentPage}`)

        setSearchParams(urlQuery)

        // eslint-disable-next-line
    }, [filter, currentPage]);

    useEffect(() => {
        // синхронизация происходит в useEffect

        const result: any = {}
        // @ts-ignore
        for (const [key, value] of searchParams.entries()) {
            let value2: any = +value
            if (isNaN(value2)) {
                value2 = value
            }
            if (value === 'true') {
                value2 = true
            } else if (value === 'false') {
                value2 = false
            }
            result[key] = value2
        }

        let actualPage = result.page || currentPage
        let term = result.term || filter.term

        let friend = result.friend || filter.friend
        if (result.friend === false) {
            friend = result.friend
        }

        const actualFilter = { friend, term }

        dispatch(getUsersTC(actualPage, pageSize, actualFilter) as unknown as AnyAction)
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsersTC(pageNumber, pageSize, filter) as unknown as AnyAction);
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsersTC(1, pageSize, filter) as unknown as AnyAction);
    }

    const follow = (userId: number) => {
        dispatch(followTC(userId) as unknown as AnyAction)
    }

    const unfollow = (userId: number) => {
        dispatch(unfollowTC(userId) as unknown as AnyAction)
    }


    return <>
        <div className={style.fonUsers}>
            <h1>Пользователи</h1>
            <img src={fonUsers} className={style.fonImg} />
        </div>
        {isFetching ? <Preloader/> : null} 
        <div className={style.users}>

            <UsersFormSearch onFilterChanged={onFilterChanged} />

            <Paginator
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                pageSize={pageSize}
                totalUsersCount={totalUsersCount} />
            {
                users.map(u => <User
                    user={u}
                    key={u.id}
                    followingInProgress={followingInProgress}
                    followTC={follow}
                    unfollowTC={unfollow}
                />)
            }
        </div>
    </>

}

export const EnchancedUsers = withAuthRedirect(Users)


