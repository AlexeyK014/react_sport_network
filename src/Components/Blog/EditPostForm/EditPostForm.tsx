import "./EditPostForm.css";
import { useEffect, useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import React from "react";
import { EditPostFormType } from "../../../Types/Types";


export const EditPostForm: React.FC<EditPostFormType> = ({selectedPost, editBlogPost, handleEditFormHide}) => {

  const [postTitle, setPostTitle] = useState<string>(selectedPost.title)
  const [postDesc, setPostDesc] = useState<string>(selectedPost.description)

  const handlePostTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPostTitle((e.target as HTMLInputElement).value)
  };

  const handlePostDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostDesc((e.target as HTMLTextAreaElement).value)
  };

  const savePost = (e: React.FormEvent) => {
    e.preventDefault()
    const post = {
      id: selectedPost.id,
      title: postTitle,
      description: postDesc,
      liked: selectedPost.liked,
    }

    editBlogPost(post);
    handleEditFormHide()
  }

  useEffect(() => {
    const handleEscape = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        handleEditFormHide();
      }
    };
    //@ts-ignore
    window.addEventListener('keyup', handleEscape)

    //@ts-ignore
    return () => window.removeEventListener('keyup', handleEscape)
  }, [handleEditFormHide])

  return (
    <>
      <form className="editPostForm" onSubmit={savePost}>
        <button className="hideBtn" onClick={handleEditFormHide}>
          <CancelIcon />
        </button>
        <h2>Редактирование поста</h2>
        <div>
          <input
            className="editFormInput"
            type="text"
            name="postTitle"
            placeholder="Заголовок поста"
            value={postTitle}
            onChange={handlePostTitleChange}
            required
          />
        </div>
        <div>
          <textarea
            className="editFormInput"
            name="postDescription"
            placeholder="Описание поста"
            value={postDesc}
            onChange={handlePostDescChange}
            rows={8}
            required
          />
        </div>
        <div>
          <button
            className="blackBtn"
            type="submit"
          >
            Сохранить
          </button>
        </div>
      </form>
      <div onClick={handleEditFormHide} className="overlay"></div>
    </>
  );
}