import React, { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import './App.css';
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { EnchancedNews } from './Components/News/News.tsx';
import { EnchancedUsers } from './Components/Users/Users.tsx';
import { Login } from './Components/Login/Login.tsx';
import Preloader from './Components/common/Preloader/Preloader.tsx';
import store, { AppStateType } from './Components/Redux/redux-store.ts';
import { Provider } from 'react-redux';
import { initializeApp } from './Components/Redux/app-reducer.ts'
import { AnyAction } from 'redux';
import NotFound from './Components/Not Found/NotFound.jsx';
// import 'antd/dist/ants.css'
import { Layout, Menu } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppHeader } from './Components/Header/Header.tsx';
import { selectApp } from './Components/Redux/Selectors/app-selector.ts';
import { useDispatch } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { EnchancedAimsWrapper } from './Components/Aims/AimsWrapperFromLS.tsx';
import { EnchancedProfielPage } from './Components/Profile/ProfileContainer.tsx';
import MobileNavBar from './Components/MobileNavBar/MobileNavBar.tsx';
import { selectAuth } from './Components/Redux/auth-selector.ts';



const { Content, Sider } = Layout;


const DialogsContainer = React.lazy(() => import('./Components/Messages/DialogsContainer.tsx'));
const ChatPage = React.lazy(() => import('./Components/Chat/ChatPage.tsx'));


export const AppFunc: React.FC = (props) => {
    const userId = useSelector((state: AppStateType) => state.auth.userId);
    const selectorApp = useSelector(selectApp);
    const dispatch = useDispatch();
    const isAuth = useSelector(selectAuth);
    const location = window.location.pathname

    // const windowInnerWidth = document.documentElement.clientWidth
    // const windowInnerHeight = document.documentElement.clientHeight


    // const [windowSize, setWindowSize] = useState({
    //     width: windowInnerWidth,
    //     height: windowInnerHeight,
    // });

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = (event) => {
            const windowInnerWidth = event.target.innerWidth
            setWidth(windowInnerWidth);
            // console.log(windowInnerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
           
        };
        
        
    }, []);
    




    useEffect(() => {

        dispatch(initializeApp() as unknown as AnyAction)

        console.log(location)
    }, [selectorApp])

    // useEffect(() => {
    //     window.onresize = () => {
    //         setWindowSize({
    //             width: windowInnerWidth,
    //             height: windowInnerHeight,
    //         });
    //     };
    // }, []);

    // console.log(windowInnerWidth, windowInnerHeight);




    if (!selectorApp) {
        return <Preloader />
    }

    console.log(width);
    


    return (
        <Layout className='page' >
            {userId && <AppHeader userId={userId} />}

            <Layout className='page2' >
                {isAuth
                    ? (
                        width > 800
                            ? (
                                <Sider width={200} className='sider-page' style={{ background: '#fbeede' }}>
                                    <Menu
                                        className='sider'
                                        mode="inline"
                                        defaultOpenKeys={['1']}
                                        selectedKeys={[location]}
                                        style={{ borderRight: 5, color: '#3b2d41' }}
                                    >

                                        <Menu.Item key="1" className='itemMenu'>
                                            <Link to={`/profile/26225`}>Мой профайл</Link>
                                            {/* <Link to={`/profile/${userId}`}>Мой профайл</Link> */}
                                        </Menu.Item>
                                        <Menu.Item key="2">
                                            <Link to={"/users"}>Пользователи</Link>
                                        </Menu.Item>
                                        <Menu.Item key="3">
                                            <Link to={'/myaims'}>Мои цели</Link>
                                        </Menu.Item>
                                        <Menu.Item key="4">
                                            <Link to={`/chat`}>Чат</Link>
                                        </Menu.Item>
                                        <Menu.Item key="5">
                                            <Link to={'/news'}>News</Link>
                                        </Menu.Item>
                                    </Menu>
                                </Sider>
                            )
                            : (<MobileNavBar />)
                    ) : ('')
                }
                <Layout className='content'>
                    <Content >
                        <Suspense fallback={<div><Preloader /></div>}>
                            <Routes>
                                <Route path="/" element={<Navigate to="/profile" />} />
                                <Route path='/profile/*' element={<EnchancedProfielPage />}>
                                    <Route path=':userId' element={<EnchancedProfielPage />} />
                                </Route>
                                <Route path='/users' element={<EnchancedUsers />} />
                                <Route path='/dialogs/*' element={<DialogsContainer />} />
                                <Route path='/news' element={<EnchancedNews />} />
                                <Route path='/login' element={<Login />} />
                                <Route path='*' element={<NotFound />} />
                                <Route path='/chat' element={<ChatPage />} />
                                <Route path='/myaims' element={<EnchancedAimsWrapper />} />
                            </Routes>
                        </Suspense>
                    </Content>
                </Layout>
            </Layout>
        </Layout>

    )
}




const MainApp: React.FC = () => {
    const queryClient = new QueryClient()
    return <QueryClientProvider client={queryClient}>
        {/* <BrowserRouter  basename ="/"> */}
        <HashRouter>
            <Provider store={store}>
                <AppFunc />
            </Provider>
        </HashRouter>
    </QueryClientProvider>

}

export default MainApp;
