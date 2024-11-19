import React from "react";
//@ts-ignore
import style from './../Dialogs.module.css';
import { NavLink } from "react-router-dom";

type PropsType = {
    name: string
    id: number
}
const DialogItem: React.FC<PropsType> = (props) => {
    return <div className={style.dialog}>
        <NavLink to={`/dialogs/${props.id}`}>{props.name}</NavLink>
    </div>
}

export default DialogItem