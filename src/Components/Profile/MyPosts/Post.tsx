// import './AddPostForm.css';
import React from 'react';
//@ts-ignore
import style from './Post.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const Post = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    // <div className={style.postPage}>
    //   {post}
    // </div>

    <div className={style.postPage}>
      <p className={`${task.completed ? "completed" : "incompleted"}`} onClick={() => toggleComplete(task.id)}>{task.task}</p>      
      <div>
        <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => editTodo(task.id)} />
        <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deleteTodo(task.id)} />
      </div>
    </div>
  );
};

export default Post