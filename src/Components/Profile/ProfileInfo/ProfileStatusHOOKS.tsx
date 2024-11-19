import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {  updateStatus } from "../../Redux/profile-reducer.ts";
import { AnyAction } from "redux";
import { useSelector } from "react-redux";
import { AppStateType } from "../../Redux/redux-store.ts";
import { useParams } from "react-router-dom";
//@ts-ignore
import style from './ProfileStatus.module.css'

type PropsType = {
    status: string;
    // updateStatus: (status: string) => void
}

const ProfileStatusHOOKS: React.FC<PropsType> = (props) => {
    const dispatch = useDispatch();
    let { userId } = useParams();
    const userIdState = useSelector((state: AppStateType) => state.auth.userId);

    let [editeMode, setEditeMode] = useState(false);
    let [statusText, setStatusText] = useState(props.status);

    useEffect(() => {       // происходит после отрисовки всей компаненты
        setStatusText(props.status);
    }, [props.status])


    const activateMode = () => {
        setEditeMode(true)
    }
    const deactiveteEditeMode = () => {
        setEditeMode(false);
        dispatch(updateStatus(statusText) as unknown as AnyAction)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatusText(e.currentTarget.value)
    }

    console.log(userId, userIdState);
    

    return (
        <div>
            {!editeMode &&
                <div>
                    <q>
                        {+userId === userIdState && <span onDoubleClick={activateMode}>{props.status || '--'}</span>
                            || <span>{props.status || '--'}</span>}
                    </q>
                </div>
            }
            {editeMode &&
                <div>
                    <q>
                        <input
                            onChange={onStatusChange}
                            value={statusText}
                            autoFocus={true}
                            onBlur={deactiveteEditeMode} 
                            className={style.statusInput}/>
                    </q>
                    
                </div>
            }

        </div>

    )


}
export default ProfileStatusHOOKS
