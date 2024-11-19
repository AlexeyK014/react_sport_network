import React, { useEffect, useState } from "react";
import Post from "./Post.tsx";
import MyPostForm, { PostFormValueType, ReduxMyPostForm } from "./MyPostForm.tsx";
import { PostDataType } from "../../../Types/Types.ts";
//@ts-ignore
import style from './Post.module.css'
import { useSelector } from "react-redux";
import { AppStateType } from "../../Redux/redux-store.ts";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { EditTodoForm } from "./EditTodoForm.jsx";


export type MapPropsType = {
    postData: Array<PostDataType>
}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}

export type NewTodosPropsType = {
    id: number
    task: string
    completed: boolean
    isEditing: boolean
}




const MyPosts: React.FC<NewTodosPropsType & DispatchPropsType> = React.memo(() => {
    let { userId } = useParams();
    const postData = useSelector((state: AppStateType) => state.profilePage.postData);
    const newPostText = useSelector((state: AppStateType) => state.profilePage.newPostText);
    const userIdState = useSelector((state: AppStateType) => state.auth.userId);
    console.log(userId, userIdState);

    const dispatch = useDispatch()

    const [todos, setTodos] = useState([])

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos') as string) || [];
        setTodos(savedTodos);
    }, []);

    const addTodo = (todo: string) => {
        const newTodos = [...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }];
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }


    const toggleComplete = (id: number) => {
        const newTodos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const deleteTodo = (id: number) => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const editTodo = (id: number) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo))
    }

    const editTask = (task, id: number) => {
        const newTodos = todos.map(todo => todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    return (
        <div className={style.formBlock}>
            <h1 className={style.blogTitle}>Мой блог</h1>

            <div className={style.postsForm}>
                <MyPostForm addTodo={addTodo} />
                {todos.map((todo, index) => (
                    todo.isEditing ? (
                        <EditTodoForm editTodo={editTask} task={todo} />
                    ) : (
                        <Post
                            task={todo}
                            key={index}
                            toggleComplete={toggleComplete}
                            deleteTodo={deleteTodo}
                            editTodo={editTodo}
                        />
                    )

                ))}
            </div>


            {/* {+userId === userIdState
                ? <div className={style.postsForm}>
                    <ReduxMyPostForm onSubmit={addTodo} />
                    <div>
                        {posts}
                    </div>
                </div>
                : <div className={style.emptyBlog}>
                    {'К сожалению, автор пока не ведёт блог'}
                </div>
            } */}


        </div>
    )
}
)
export default MyPosts;

