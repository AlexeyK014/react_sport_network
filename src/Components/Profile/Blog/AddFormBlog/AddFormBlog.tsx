import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useAddPostMutation } from '../../../../reduxToolkit/blog/slice.ts'
//@ts-ignore
import style from './AddFormBlog.module.css'
import { Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const AddFormBlog: React.FC = () => {
    const [newTitle, setNewTitle] = useState<string>('')
    const [newDescription, setNewDescription] = useState<string>('')

    const [addPost] = useAddPostMutation()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //@ts-ignore
        addPost({ description: newDescription, title: newTitle, id: 1, liked: false })
        setNewTitle('')
        setNewDescription('')
    }

    // Типизация события изменения input
    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value);
    };

    // Типизация события изменения textarea
    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewDescription(e.target.value);
    };
    return (
        <form onSubmit={handleSubmit} className={style.addPostForm}>
            <div className={style.inputBlog}>
                <Input
                    className={style.inputForm}
                    type="text"
                    id="new-title"
                    value={newTitle}
                    onChange={handleTitleChange}
                    placeholder="Заголовок"
                />
                <TextArea
                    className={style.textareaForm}
                    id="new-description"
                    value={newDescription}
                    onChange={handleDescriptionChange}
                    placeholder="Ваш пост"
                />
            </div>
            <button className={style.btnForm} type='submit'>
                Добавить пост
            </button>
        </form>
    )
}

export default AddFormBlog