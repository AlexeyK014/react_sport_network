
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
//@ts-ignore
import style from './PostCard.module.css'
import React from 'react';
import { PostCartType } from '../../../Types/Types';

export const PostCard: React.FC<PostCartType> = ({
  title,
  description,
  liked,
  likePost,
  deletePost,
  handleEditFormShow,
  handleSelectPost,
}) => {
  const showEditForm = () => {
    //@ts-ignore
    handleSelectPost();
    //@ts-ignore
    handleEditFormShow();
  };

  const heartFill = liked ? 'crimson' : '#ffc277';

  return (
    <div className={style.post}>
      <div className={style.postContent}>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className={style.likePost}>
            <FavoriteIcon style={{ fill: heartFill }} onClick={likePost}/>
        </div>
      </div>
        <div className={style.postControl}>
          <div className={style.editPost}>
            <EditIcon className={style.editBtn} onClick={showEditForm} style={{ fill: '#3B2D41' }}/>
            <span className={style.editTooltip}>Редактировать</span>
          </div>
          <div className={style.deletePost}>
            <DeleteForeverIcon className={style.deleteBtn} onClick={deletePost} style={{ fill: '#3B2D41' }}/>
            <span className={style.deleteTooltip}>Удалить</span>
          </div>
        </div>
    </div>
  );
};