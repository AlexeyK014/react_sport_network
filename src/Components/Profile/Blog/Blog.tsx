import React from 'react';
//@ts-ignore
import style from './Blog.module.css'
import AddFormBlog from './AddFormBlog/AddFormBlog.tsx';
import Posts from './Posts/Posts.tsx';
import { BlogPropsType } from '../../../Types/Types.ts';



export const Blog: React.FC<BlogPropsType> = ({ userId }) => {

  return (
    <div className={style.blogPage}>
      <h1 className={style.title}>
        Блог
      </h1>

      <div className={style.posts}>
        <AddFormBlog />
        <Posts userId={userId}/>
      </div>
    </div>
  )
};