import React from 'react';
//@ts-ignore
import preloader2 from '../../../Loader/preloader2.svg';
//@ts-ignore
import style from './Preloader2.module.css'


let Preloader2: React.FC = () => {
    return <div className={style.preloader}>
            <img src={preloader2}/>
        </div>
}

export default Preloader2;