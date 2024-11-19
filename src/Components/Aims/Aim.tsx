import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faCircle, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
//@ts-ignore
import style from './MyAim.module.css'
import { AimType } from '../../Types/Types'


export const Aim: React.FC<AimType> = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <div className={style.aim}>
      <p className={task.completed ? style.aimTitleComplited : style.aimTitle} onClick={() => toggleComplete(task.id)}>{task.task}</p>
      <div className={style.blockCorrection}>
        <div className={style.textHint}>
          <FontAwesomeIcon className={style.editIcon} icon={faPenToSquare} onClick={() => editTodo(task.id)} />
          <span className={style.editTooltip}>Редактировать</span>
        </div>

        <div className={style.textHint}>
          <FontAwesomeIcon className={style.deleteIcon} icon={faTrash} onClick={() => deleteTodo(task.id)} />
          <span className={style.editTooltip}>Удалить</span>
        </div>

        <div className={style.textHint}>
          <FontAwesomeIcon className={style.deleteIcon} icon={task.completed ? faCheckCircle : faCircle} onClick={() => toggleComplete(task.id)} />
          <span className={style.editTooltip}>{task.completed ? 'Выполнено' : 'Отметить как выполено'}</span>
        </div>

      </div>

    </div>
  )
}