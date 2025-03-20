import React, { useState } from 'react';
//@ts-ignore
import style from './Targets.module.css'
import TextArea from 'antd/es/input/TextArea';
import { TargetFromProps } from '../../Types/Types';

const TargetFrom: React.FC<TargetFromProps> = ({ addTarget }) => {
    const [targetText, setTargetText] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addTarget({ target: targetText, id: 1, completed: false })
        setTargetText('')
    }
    return (
        <form onSubmit={handleSubmit} className={style.aimForm}>

            <TextArea
                value={targetText}
                onChange={(e) => setTargetText(e.target.value)}
                placeholder="Ваша цель..."
                autoSize={{ minRows: 2, maxRows: 6 }}
                className={style.textAim}
            />
            <button
                className={style.targetBtn}
                type='submit'
            >
                Добавить
            </button>
        </form >

    )
}

export default TargetFrom