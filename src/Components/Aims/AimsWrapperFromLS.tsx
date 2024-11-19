import React, {useState, useEffect, SetStateAction} from 'react'
import { v4 as uuidv4 } from 'uuid';
import { AimForm } from './AimForm.tsx';
import { EditAimForm } from './EditeAimFrom.tsx';
import { Aim } from './Aim.tsx';
//@ts-ignore
import style from './MyAim.module.css'
//@ts-ignore
import fonAim from '../../img/fonAim1.jpg'
uuidv4();

export type NewTodosType = {
    id: number;
    task: string;
    completed: boolean;
    isEditing: boolean;
}

export const AimsWrapperFromLS: React.FC<{}> = () => {
    const [todos, setTodos] = useState<{id: number, todo: string, completed: boolean, isEditing: boolean}[]>([])

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos') as unknown as string) || [];
        setTodos(savedTodos);
    }, []);

    const addTodo = (todo: string) => {
        const newTodos = [...todos, {id: uuidv4(), task: todo, completed: false, isEditing: false}];
        setTodos(newTodos as unknown as SetStateAction<{id: number, todo: string, completed: boolean, isEditing: boolean}[]>);
        localStorage.setItem('todos', JSON.stringify(newTodos));
        console.log(newTodos);
        
    }

    const toggleComplete = (id: number) => {
        const newTodos = todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const deleteTodo = (id: number) => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const editTodo = (id: number) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo))
    }

    const editTask = (task, id: number) => {
        const newTodos = todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }
  return (
    <div className={style.aimPage}>
        <div className={style.fonAim}>
            <h1>Мои цели</h1>
            <img src={fonAim} className={style.fonImg} />
        </div>
        <AimForm addTodo={addTodo} />
        {todos.map((todo, index) => (
            todo.isEditing ? (
                <EditAimForm editTodo={editTask} task={todo} />
            ) : (
                //@ts-ignore
                <Aim task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
            )
            
        ))}
         
    </div>
  )
}