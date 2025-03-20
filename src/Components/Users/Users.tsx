import React, { useEffect, useState } from "react";
import Paginator from "../common/Paginator/Paginator.tsx";
import User from "./User.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import Preloader from "../common/Preloader/Preloader.tsx";
//@ts-ignore
import style from './Users.module.css';
import { useFollowMutation, useGetUsersQuery, useUnfollowMutation } from "../../reduxToolkit/user/slice.ts";
import { Input, Select, Space } from "antd";

// interface UserType {
//     id: number;
//     followed: boolean;
//     // Добавьте другие поля пользователя по необходимости
// }

// interface UsersResponse {
//     items: UserType[];
//     totalCount: number;
// }


export let Users: React.FC = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [term, setTerm] = useState<string>('');
    const [filter, setFilter] = useState<'Все' | 'Друзья' | 'Остальные'>('Все');
    const [follow] = useFollowMutation();
    const [unfollow] = useUnfollowMutation();
    const { data, refetch, isLoading } = useGetUsersQuery(
        { currentPage, term, filter },
        { refetchOnMountOrArgChange: true, }
    );
    

    //@ts-ignore
    const page: number = new URLSearchParams(location.search).get("page") || 1;
     //@ts-ignore
    const termUrl: string = new URLSearchParams(location.search).get("term") || '';
     //@ts-ignore
    const filterUrl: 'Все' | 'Друзья' | 'Остальные' = new URLSearchParams(location.search).get("filter") as 'Все' | 'Друзья' | 'Остальные' || 'Все';


    useEffect(() => {
        navigate({
            pathname: `/users`,
            search: `?page=${currentPage}&term=${term}&filter=${filter}`
        })
    }, [data, navigate, currentPage, filter])


    useEffect(() => {
        if (page || termUrl || filterUrl) {
            navigate({
                pathname: `/users`,
                search: `?page=${page}&term=${termUrl}&filter=${filterUrl}`
            })
            setCurrentPage(page);
            setTerm(termUrl);
            setFilter(filterUrl);
        }
    }, [navigate, page, termUrl, filterUrl])



    if (data === undefined) {
        return <Preloader />
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const params = new URLSearchParams()
        params.set('page', '1') // Сбрасываем на первую страницу при новом поиске
        // navigate({ term: params.toString() })
        setTerm(term);
        refetch()
    }


    const onPageChanged = (currentPage: number) => {
        setCurrentPage(currentPage);
        refetch()
        console.log(currentPage);
    }

    const filteredUsers = data?.items.filter(user => {
        if (filter === 'Друзья') {
            return user.followed === true;
        } else if (filter === 'Остальные') {
            return user.followed === false;
        } else {
            return true; // Все пользователи
        }
    });



    if (isLoading) {
        return <div>Loading</div>
    }

    return <>
        {data
            ?.items
            ? <div>
                <h2 className={style.usersTitle}>
                    {filter === 'Друзья' ? 'Подписанные пользователи' : filter === 'Остальные' ? 'Неподписанные пользователи' : 'Все пользователи'}
                </h2>

                <div className={style.users}>
                    <form onSubmit={handleSubmit} className={style.formBlog}>
                        <div className={style.formInput}>
                            <Space.Compact>
                                <Input
                                    type="text"
                                    value={term}
                                    onChange={(e) => setTerm(e.target.value)}
                                    placeholder="Имя пользователя..."
                                />
                            </Space.Compact>
                        </div>

                        <div  className={style.formSelect}>
                            <Select
                                defaultValue="Все"
                                style={{ width: 120 }}
                                onChange={(value: 'Все' | 'Друзья' | 'Остальные') => setFilter(value)}
                                options={[
                                    { value: 'Все', label: 'Все' },
                                    { value: 'Друзья', label: 'Друзья' },
                                    { value: 'Остальные', label: 'Остальные' },
                                ]}
                            />
                        </div>

                    </form>


                    <Paginator
                        currentPage={currentPage}
                        onPageChanged={onPageChanged}
                        totalUsersCount={data?.totalCount}
                    />

                    {filteredUsers.map(user => {
                        return (
                            <div key={user.id}>
                                <User
                                    user={user}
                                    
                                    refetch={refetch}
                                    follow={follow}
                                    unfollow={unfollow}
                                />
                            </div>
                        )
                    })
                    }
                </div>
            </div>
            : (<Preloader />)
        }
    </>
}





