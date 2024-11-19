import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
//@ts-ignore
import style from './Blog.module.css'
import { AddPostForm } from './AddPostForm/AddPostForm.tsx';
import { EditPostForm } from './EditPostForm/EditPostForm.tsx';
import { PostCard } from './PostCard/PostCard.tsx';
import { useAddPost, useDeletePost, useEditPost, useGetPosts, useLikePost } from '../../hooks/useAddPost.ts';
import { useSelector } from 'react-redux';
import { AppStateType } from '../Redux/redux-store.ts';
import { Params, useParams } from 'react-router-dom';

export type TPost = {
  blogPost: string | undefined
}

export const Blog: React.FC = () => {
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState({});

  let { userId } = useParams<Params>();
  const userIdState = useSelector((state: AppStateType) => state.auth.userId);
  console.log(userId);

  const { data: posts, isLoading, isError, error, isFetching } = useGetPosts();

  const likeMutation = useLikePost();
  const deleteMutation = useDeletePost();
  const editMutation = useEditPost();
  const addMutation = useAddPost();

  if (isLoading) return <h1>Загружаю данные...</h1>;

  //@ts-ignore
  if (isError) return <h1>{error.message}</h1>;

  const likePost = (blogPost: any) => {
    const updatedPost = { ...blogPost };
    updatedPost.liked = !updatedPost.liked;
    likeMutation.mutate(updatedPost);
    console.log('LIKE');

  };

  const deletePost = (blogPost: any) => {
    if (window.confirm(`Удалить ${blogPost.title}?`)) {
      deleteMutation.mutate(blogPost)
    }
  };

  const editBlogPost = (updatedBlogPost: any) => {
    editMutation.mutate(updatedBlogPost)
  };

  const addNewBlogPost = (newBlogPost: any) => {
    addMutation.mutate(newBlogPost)
  };


  const handleEditFormShow = () => {
    setShowEditForm(true);
  };

  const handleEditFormHide = () => {
    setShowEditForm(false);
  };

  const handleSelectPost = (blogPost: any) => {
    setSelectedPost(blogPost);
  };

  //@ts-ignore
  const blogPosts = posts.map((item: any) => {
    return (
      <React.Fragment key={item.id}>
            <PostCard
              title={item.title}
              description={item.description}
              liked={item.liked}
              likePost={() => likePost(item)}
              deletePost={() => deletePost(item)}
              handleEditFormShow={handleEditFormShow}
              handleSelectPost={() => handleSelectPost(item)}
            />
      </React.Fragment>
    );
  }).reverse();

  const postsOpactiy = isFetching ? 0.5 : 1;

  return (
    <div className={style.blogPage}>
      <h1 className={style.title}>
        Блог
      </h1>
      {+userId === userIdState
        ? (<div>
            <AddPostForm
          addNewBlogPost={addNewBlogPost}
          />

          {showEditForm && (
            <EditPostForm
              handleEditFormHide={handleEditFormHide}
              //@ts-ignore
              selectedPost={selectedPost}
              editBlogPost={editBlogPost}
            />
          )}

            <div className={style.posts}
              style={{ opacity: postsOpactiy }}
            >
              {blogPosts}
            </div>
            {isFetching && <CircularProgress className={style.preloader} />}
          </div>)
        : <div className={style.emptyBlog}>
          <p>
            К сожалению, автор пока не ведёт блог
          </p>
        </div>
      }

    </div>
  );
};