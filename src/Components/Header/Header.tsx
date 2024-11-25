import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AppStateType } from "../Redux/redux-store";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { logoutTC } from "../Redux/auth-reducer.ts";
import { Button, Col, Layout, Row } from "antd";
import { selectAuth, selectCurrentUserLogin } from "../Redux/auth-selector.ts";
import { Link, useParams } from "react-router-dom";
//@ts-ignore
import style from './Header.module.css';
//@ts-ignore
import userProfile from '../../img/avaUsers.png'



const { Header } = Layout;

export const AppHeader: React.FC<{}> = ({ userId }) => {
    const isAuth = useSelector(selectAuth);
    const login = useSelector(selectCurrentUserLogin);
    const profile = useSelector((state: AppStateType) => state.profilePage.profile);
    // let { userId } = useParams();
    const userIdState = useSelector((state: AppStateType) => state.auth.userId);
    const authorizedUserId = useSelector((state: AppStateType) => state.auth.userId);

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        window.onresize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
    }, []);

    // console.log(profile);


    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutTC() as unknown as AnyAction)
    }

    let menuRef = useRef<HTMLDivElement>();

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
                {isAuth
                    ? <>
                        <Col span={1}>
                            <div profile={profile} userId={userId} className={style.avaBlog}>
                                <img
                                    src={profile?.photos.large}
                                    className={style.avatarHeader}
                                    // src={+userId === userIdState && (profile?.photos.large || userProfile) || (profile?.photos.large || userProfile) } 
                                    // className={style.avatarHeader} 
                                    alt="avatarProfile">
                                </img>
                            </div>
                        </Col>
                        <Col span={5} >
                            <div ref={menuRef}>
                                <span className={style.login}>{login}</span>
                                <button onClick={logout} className={style.btnExit}>Выйти</button>
                            </div>

                        </Col>
                    </>
                    :
                    <Col span={6}>
                        <Button>
                            {/* <Link to={'/yoursport'}>Login</Link> */}
                            <Link to={'/login'}>Login</Link>
                        </Button>
                    </Col>
                }
            </Row>
        </Header>
    )
}