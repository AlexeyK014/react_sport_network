import React, { useState} from 'react'
//@ts-ignore
import style from './MyAim.module.css'
import { AimFormType } from '../../Types/Types';


export const AimForm: React.FC<AimFormType> = ({addTodo}) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      // prevent default action
        e.preventDefault();
        if (value) {
          // add todo
          addTodo(value);
          // clear form after submission
          setValue('');
        }
      };
  return (
    <form onSubmit={handleSubmit} className={style.aimForm}>
    <textarea
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
      className={style.textAim} 
      placeholder='Ваша цель...' 
    />
    <button type="submit" className={style.aimFormBtn}>Добавить</button>
  </form>
  )
}