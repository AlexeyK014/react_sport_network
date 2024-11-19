import { useState } from 'react';
//@ts-ignore
import style from './AddPostForm.module.css'
import { AddPostFormType } from '../../../Types/Types';
import React from 'react';

export const AddPostForm: React.FC<AddPostFormType> = ({ addNewBlogPost }) => {
  const [postTitle, setPostTitle] = useState('');
  const [postDesc, setPostDesc] = useState('');

  const handlePostTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPostTitle((e.target as HTMLInputElement).value);
  };

  const handlePostDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostDesc((e.target as HTMLTextAreaElement).value);
  };

  const createPost = (e: React.FormEvent) => {
    e.preventDefault();
    const post = {
      title: postTitle,
      description: postDesc,
      liked: false,
    };

    addNewBlogPost(post);
    
    setPostTitle('')
    setPostDesc('')
    
  };


  return (
    <>
      <form className='addPostForm' onSubmit={createPost}>
        <div>
          <input
            className={style.inputForm}
            type='text'
            name='postTitle'
            placeholder='Заголовок поста'
            value={postTitle}
            onChange={handlePostTitleChange}
            required
          />
        </div>
        <div>
          <textarea
            className={style.textareaForm}
            name='postDescription'
            placeholder='Описание поста'
            value={postDesc}
            onChange={handlePostDescChange}
            rows={8}
            required
          />
        </div>
        <div>
          <button className={style.btnForm} type='submit'>
            Добавить пост
          </button>
        </div>
      </form>
    </>
  );
};