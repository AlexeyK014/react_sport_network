import React from 'react';
//@ts-ignore
import preloader from '../../../Loader/preloader.svg';
//@ts-ignore
import style from './Preloader.module.css'


let Preloader: React.FC = () => {
    return <div className={style.preloader}>
            <img src={preloader}/>
        </div>
}

export default Preloader;