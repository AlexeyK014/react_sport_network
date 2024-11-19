import React, { Suspense, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import News from './Components/News/News.tsx';
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
import { AimsWrapperFromLS } from './Components/Aims/AimsWrapperFromLS.tsx';
import { EnchancedProfielPage } from './Components/Profile/ProfileContainer.tsx';
import FirstPage from './Components/FirstPage/FirstPage.tsx';



const { Content, Sider } = Layout;


const DialogsContainer = React.lazy(() => import('./Components/Messages/DialogsContainer.tsx'));
const ChatPage = React.lazy(() => import('./Components/Chat/ChatPage.tsx'));


export const AppFunc: React.FC = (props) => {
    const userId = useSelector((state: AppStateType) => state.auth.userId);
    const selectorApp = useSelector(selectApp);
    const dispatch = useDispatch();

    const location = window.location.pathname


    useEffect(() => {
        dispatch(initializeApp() as unknown as AnyAction)
        console.log(location)
    }, [selectorApp])


    if (!selectorApp) {
        return <Preloader />
    }

    console.log(userId);



    return (
        <Layout className='page'>
            {userId && <AppHeader userId={userId}/>}

            <Layout className='page2' >
                {
                    userId &&
                    <Sider width={200} className='sider-page' style={{ background: '#fbeede' }}>
                        <Menu
                            className='sider'
                            mode="inline"
                            defaultOpenKeys={['1']}
                            selectedKeys={[location]}
                            style={{ borderRight: 5, color: '#3b2d41' }}
                        >

                            <Menu.Item key="1" className='itemMenu'>
                                {/* <Link to={`/profile/26225`}>Мой профайл</Link> */}
                                 <Link to={`/profile/${userId}`}>Мой профайл</Link>
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
                                <Route path='/news' element={<News />} />
                                <Route path='/login' element={<Login />} />
                                <Route path='*' element={<NotFound />} />
                                <Route path='/chat' element={<ChatPage />} />
                                <Route path='/myaims' element={<AimsWrapperFromLS />} />
                                {/* <Route path='/yoursport' element={<FirstPage />} /> */}
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



// import React, { Component, Suspense } from 'react'
// import './App.css'
// // import 'antd/dist/antd.css'
// import { BrowserRouter, HashRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
// import { connect, Provider } from 'react-redux'
// import { compose } from 'redux'
// import store, { AppStateType } from './Components/Redux/redux-store.ts';
// import { AppHeader } from './Components/Header/Header.tsx';
// import { initializeApp } from './Components/Redux/app-reducer.ts'
// import { Login } from './Components/Login/Login.tsx';
// import Preloader from './Components/common/Preloader/Preloader.tsx';
// import { EnchancedUsers } from './Components/Users/Users.tsx';
// import { Breadcrumb, Layout, Menu } from 'antd'
// import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
// import { withSuspense } from './HOC/withSuspens.tsx'
// import News from './Components/News/News.tsx';
// import NotFound from './Components/Not Found/NotFound.jsx';
// import { EnchancedProfielPage } from './Components/Profile/ProfileContainer.tsx';
// import { AimsWrapperFromLS } from './Components/Aims/AimsWrapperFromLS.tsx';
// import { withRouter } from 'react-router-dom'
// import { QueryClient, QueryClientProvider } from 'react-query'

// const { SubMenu } = Menu
// const { Content, Footer, Sider } = Layout

// const DialogsContainer = React.lazy(() => import('./Components/Messages/DialogsContainer.tsx'));
// const ChatPage = React.lazy(() => import('./Components/Chat/ChatPage.tsx'));

// type MapPropsType = ReturnType<typeof mapStateToProps>
// type DispatchPropsType = {
//     initializeApp: () => void
// }

// const SuspendedDialogs = withSuspense(DialogsContainer)
// const SuspendedChatPage = withSuspense(ChatPage)


// class App extends Component<MapPropsType & DispatchPropsType> {
//     catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
//         alert('Some error occured')
//     }

//     componentDidMount() {
//         this.props.initializeApp()
//         window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
//     }

//     componentWillUnmount() {
//         window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
//     }

//     render() {
//         if (!this.props.initialized) {
//             return <Preloader />
//         }


//         return (
//             <Layout>
//                 <AppHeader />
//                 <Content style={{ padding: '0 50px' }}>
//                     <Breadcrumb style={{ margin: '16px 0' }}>
//                         <Breadcrumb.Item>Home</Breadcrumb.Item>
//                         <Breadcrumb.Item>List</Breadcrumb.Item>
//                         <Breadcrumb.Item>App</Breadcrumb.Item>
//                     </Breadcrumb>
//                     <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
//                         <Sider className="site-layout-background" width={200}>
//                             <Menu
//                                 mode="inline"
//                                 /*  defaultSelectedKeys={['7']}*/
//                                 /*  defaultOpenKeys={['sub1']}*/
//                                 style={{ height: '100%' }}
//                             >
//                                 <SubMenu key="sub1" icon={<UserOutlined />} title="My Profile">
//                                     <Menu.Item key="1"> <Link to="/profile">Profile</Link></Menu.Item>
//                                     <Menu.Item key="2"> <Link to="/dialogs">Messages</Link></Menu.Item>
//                                     <Menu.Item key="3"><Link to="/users">Users</Link></Menu.Item>
//                                     <Menu.Item key="4">option4</Menu.Item>
//                                 </SubMenu>
//                                 <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
//                                     <Menu.Item key="5"><Link to="/developers">Developers</Link></Menu.Item>
//                                     <Menu.Item key="6">option6</Menu.Item>
//                                     <Menu.Item key="7">option7</Menu.Item>
//                                     <Menu.Item key="8">option8</Menu.Item>
//                                 </SubMenu>
//                                 <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
//                                     <Menu.Item key="9"><Link to="/chat">Chat</Link></Menu.Item>
//                                     <Menu.Item key="10">option10</Menu.Item>
//                                     <Menu.Item key="11">option11</Menu.Item>
//                                     <Menu.Item key="12">option12</Menu.Item>
//                                 </SubMenu>
//                             </Menu>
//                         </Sider>
//                         <Content style={{ padding: '0 24px', minHeight: 280 }}>

//                             <Suspense fallback={<div><Preloader /></div>}>
//                                 <Routes>
//                                     <Route path="/" element={<Navigate to="/profile" />} />
//                                     <Route path='/profile/*' element={<EnchancedProfielPage />}>
//                                         <Route path=':userId' element={<EnchancedProfielPage />} />
//                                     </Route>
//                                     <Route path='/users' element={<EnchancedUsers />} />
//                                     <Route path='/dialogs/*' element={<DialogsContainer />} />
//                                     <Route path='/news' element={<News />} />
//                                     <Route path='/login' element={<Login />} />
//                                     <Route path='*' element={<NotFound />} />
//                                     <Route path='/chat' element={<ChatPage />} />
//                                     <Route path='/myaims' element={<AimsWrapperFromLS />} />
//                                     {/* <Route path='/yoursport' element={<FirstPage />} /> */}
//                                 </Routes>
//                             </Suspense>

//                         </Content>
//                     </Layout>
//                 </Content>
//                 <Footer style={{ textAlign: 'center' }}>Samurai Social Network ©2020 Created by IT-KAMASUTRA</Footer>
//             </Layout>


//             /*      <div className='app-wrapper'>
//                       <HeaderContainer/>
//                       <Navbar/>
//                       <div className='app-wrapper-content'>
//                           <Switch>
//                               <Route exact path='/'
//                                      render={() => <Redirect to={"/profile"}/>}/>

//                               <Route path='/dialogs'
//                                      render={() => <SuspendedDialogs /> }/>

//                               <Route path='/profile/:userId?'
//                                      render={() => <SuspendedProfile /> }/>

//                               <Route path='/users'
//                                      render={() => <UsersPage pageTitle={"Самураи"}/>}/>

//                               <Route path='/login'
//                                      render={() => <LoginPage/>}/>

//                               <Route path='*'
//                                      render={() => <div>404 NOT FOUND</div>}/>
//                           </Switch>

//                       </div>
//                   </div>*/
//         )
//     }
// }

// const mapStateToProps = (state: AppStateType) => ({
//     initialized: state.app.initialized
// })

// let AppContainer = compose<React.ComponentType>(
//     // withRouter,
//     connect(mapStateToProps, { initializeApp }))(App)

// const MainApp: React.FC = () => {
//     const queryClient = new QueryClient()
//     return <QueryClientProvider client={queryClient}>
//         <HashRouter>
//             <Provider store={store}>
//                 <AppContainer />
//             </Provider>
//         </HashRouter>
//     </QueryClientProvider>

// }

// export default MainApp