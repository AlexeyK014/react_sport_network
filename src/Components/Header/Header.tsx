import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Layout, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
//@ts-ignore
import style from './Header.module.css';
//@ts-ignore
import userProfile from '../../img/avaUsers.png'
import { profileApi, useGetProfileQuery, useSavePhotoMutation, useUpdatedProfileMutation } from "../../reduxToolkit/profile/slice.ts";
import { authApi, useLogoutMutation } from "../../reduxToolkit/auth/slice.ts";
import { HeaderPropsType } from "../../Types/Types.ts";



const { Header } = Layout;

export const AppHeader: React.FC<HeaderPropsType> = ({ userId, loginUser }) => {
    const [skipProfile, setSkipProfile] = useState<boolean>(true)

    const { data, refetch, isFetching } = useGetProfileQuery(userId, {
        skip: skipProfile,
        refetchOnMountOrArgChange: true,
    });

    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [savePhoto, { isLoading: waiteUpdatePhoto }] = useSavePhotoMutation();
    const [updatedProfile] = useUpdatedProfileMutation();
    let menuRef = useRef<HTMLDivElement>(null);


    const handleInvalidate =  async(e: React.ChangeEvent<HTMLInputElement & EventTarget>) => {
        const file = e.target.files?.[0]; // Получаем файл из input
        if (file) {
            await savePhoto(file).unwrap(); // Передаем файл в мутацию
            dispatch(profileApi.util.invalidateTags(['profile']));
            refetch();
        }
    };


    const onLogoutHandler = async () => {
        await logout();
        dispatch(authApi.util.resetApiState());
        dispatch(profileApi.util.resetApiState());
        navigate({
            pathname: '/login'
        })
        setSkipProfile(true)
    };

    useEffect(() => {
        if (userId) {
            setSkipProfile(false);
            const file = new File([''], 'profile', { type: 'text/plain' }); // Создаем файл
            savePhoto(file);
            

            updatedProfile({...data })
        } else if (!userId) {
            setSkipProfile(true)
        }
    }, [data, updatedProfile, userId, savePhoto])

    useEffect(() => {
        if (data) {
            // Обновляем глобальное состояние, если нужно
            dispatch({ type: 'profile', payload: data });
            refetch()
            updatedProfile({...data })
        }
    }, [data, dispatch, refetch, updatedProfile]);



    return (
        <Header className={style.header}>
            <div className={style.logo} />
            <Row className={'headerBlock'}>

                <Col span={18}>

                    <span className={style.title}>
                        <span className={style.line}></span>
                        ТВОЙ СПОРТ
                        <span className={style.line}></span>
                    </span>

                </Col>
                {userId
                    ? <>
                        <Col span={1}>
                            <div className={style.avaBlog}>
                                <img
                                    className={style.avatarHeader}
                                    src={+userId && (data?.photos.large || userProfile) || (data?.photos.large || userProfile)}
                                    alt="avatarProfile"
                                    onClick={() => document.getElementById('file-input')?.click()} // Открываем диалог выбора файла
                                    // onChange={handleInvalidate}
                                >
                                </img>
                                <input
                                    type="file"
                                    onChange={handleInvalidate} // Обработчик изменения файла
                                    style={{ display: 'none' }} // Скрываем input
                                    id="file-input"
                                />
                            </div>
                        </Col>
                        <Col span={5} >
                            <div ref={menuRef}>
                                <span className={style.login}>{loginUser}</span>
                                <button
                                    onClick={onLogoutHandler}
                                    className={style.btnExit}>
                                    Выйти
                                </button>
                            </div>

                        </Col>
                    </>
                    :
                    <Col span={6}>
                        <Button>
                            <Link to={'/login'}>Login</Link>
                        </Button>
                    </Col>
                }
            </Row>
        </Header>
    )
}