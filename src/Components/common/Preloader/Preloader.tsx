import React from 'react';
//@ts-ignore
import preloader from '../../../Loader/preloader.svg';


let Preloader: React.FC = () => {
    return <div>
            <img src={preloader}/>
        </div>
}

export default Preloader;