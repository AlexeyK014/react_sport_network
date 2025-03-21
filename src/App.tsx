import React, { Suspense, useEffect, useState } from 'react';
import './App.css';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { News } from './Components/News/News.tsx';
import { Users } from './Components/Users/Users.tsx';
import { Login } from './Components/Login/Login.tsx';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { AppHeader } from './Components/Header/Header.tsx';
import { useDispatch } from 'react-redux';
import { Profile } from './Components/Profile/Profile.tsx';
import { profileApi } from './reduxToolkit/profile/slice.ts';
import { authApi, useSetAuthQuery } from './reduxToolkit/auth/slice.ts';
import Targets from './Components/Targets/Targets.tsx';
//@ts-ignore
import profile from './img/profile.svg';
//@ts-ignore
import friends from './img/friends.svg';
//@ts-ignore
import goal from './img/goal.svg';
//@ts-ignore
import chat from './img/chat.svg';
//@ts-ignore
import news from './img/news.svg';
import MobileNavBar from './Components/MobileNavBar/MobileNavBar.tsx';
import ChatPage from './Components/Chat/ChatPage.tsx';


const { Content, Sider } = Layout;

export const AppFunc: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const [skipProfile, setSkipProfile] = useState(true)
    const [width, setWidth] = useState(window.innerWidth);

    //@ts-ignore
    const { userId, loginUser } = useSetAuthQuery('authUser', {
        selectFromResult: ({ data }) => ({
            userId: data?.userId,
            loginUser: data?.loginUser,
            resultCode: data?.resultCode
        })
    })


    useEffect(() => {
        if (userId) {
            navigate({
                pathname: `/profile/${userId}`
            })
            setSkipProfile(false)
        }
        else if (!userId) {
            navigate({
                pathname: `/login`
            })
            setSkipProfile(true)
            dispatch(authApi.util.resetApiState());
            dispatch(profileApi.util.resetApiState());
        }
    }, [navigate, userId, dispatch])


    useEffect(() => {
        navigate({
            pathname: `${location.pathname}`
        })
    }, [navigate])



    useEffect(() => {
        const handleResize = (event) => {
            const windowInnerWidth = event.target.innerWidth
            setWidth(windowInnerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {!userId
                ? <Login />
                : (
                    < Layout className='page' >
                        <AppHeader userId={userId} loginUser={loginUser} />
                        <Layout className='page2' >
                            {width > 800
                                ? (
                                    <Sider className='sider-page' style={{ background: '#fbeede' }}>
                                        <Menu
                                            className='sider'
                                            mode="inline"
                                            defaultOpenKeys={[location.pathname]}
                                        >
                                            <Menu.Item key="1" className='itemMenu'>
                                                <img src={profile} />
                                                <Link to={`/profile/${userId}`}>Мой профайл</Link>
                                            </Menu.Item>
                                            <Menu.Item key="2" className='itemMenu'>
                                                <img src={friends} />
                                                <Link to={"/users"}>Пользователи</Link>
                                            </Menu.Item>
                                            <Menu.Item key="3" className='itemMenu'>
                                                <img src={goal} />
                                                <Link to={'/targets'}>Мои цели</Link>
                                            </Menu.Item>
                                            <Menu.Item key="4" className='itemMenu'>
                                                <img src={chat} />
                                                <Link to={`/chat`}>Чат</Link>
                                            </Menu.Item>
                                            <Menu.Item key="5" className='itemMenu'>
                                                <img src={news} />
                                                <Link to={'/news'}>News</Link>
                                            </Menu.Item>
                                        </Menu>
                                    </Sider>
                                ) : (
                                    <MobileNavBar />
                                )
                                
                            }


                            <Layout className='content'>
                                <Content>
                                    <Suspense fallback={<div>Загрузка...</div>}>
                                        <Routes>
                                            <Route path="/" element={<Navigate to={`/profile/${userId}`} />} />
                                            <Route path='/profile/*' element={<Profile />}>
                                                <Route path=':id' element={<Profile />} />
                                            </Route>
                                            <Route path='/login' element={<Login />} />
                                            <Route path='/targets' element={<Targets />} />
                                            <Route path='/users' element={<Users />} />
                                            <Route path='/news' element={<News />} />
                                            {/* <Route path='/chat' element={<ChatPage/>} /> */}
                                        </Routes>
                                    </Suspense>
                                </Content>
                            </Layout>
                        </Layout>
                    </Layout >
                )
            }
        </>
    )
}