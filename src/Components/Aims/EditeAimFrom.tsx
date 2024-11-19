import React, { useState } from 'react'
//@ts-ignore
import style from './MyAim.module.css'

export const EditAimForm = ({ editTodo, task }) => {
  const [value, setValue] = useState<string>(task.task);

  const handleSubmit = (e: React.FormEvent) => {
    // prevent default action
    e.preventDefault();
    // edit todo
    editTodo(value, task.id);
  };
  return (
    <div className={style.aim}>
      <form onSubmit={handleSubmit} className="TodoForm">
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className={style.editInput} placeholder='Update task' />
        <button type="submit" className={style.editBtn}>Add Task</button>
      </form>
    </div>

  )
}