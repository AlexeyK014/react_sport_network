import React, {useState} from 'react'
//@ts-ignore
import style from './Post.module.css'

export const EditTodoForm = ({editTodo, task}) => {
    const [value, setValue] = useState(task.task);

    const handleSubmit = (e) => {
      // prevent default action
        e.preventDefault();
        // edit todo
        editTodo(value, task.id);
      };
  return (
    <form onSubmit={handleSubmit} className={style.postPage}>
    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className={style.textareaFormEdit}  placeholder='Update task' autofocus />
    <button type="submit" className={style.btnFormEdit}>Отправить</button>
  </form>
  )
}