import { useEffect, useState } from "react"
import { todoT } from "../../types/todoTypes"
import styles from "./styles/todoList.module.css"
import {BiEdit} from "react-icons/bi"
import {FaRegTrashCan} from "react-icons/fa6"


interface Props {
    deleteTodo: (id: number)=> void,
    editTodo: (todo: todoT)=> void,
    list: todoT[]
}

export const TodoList = (props: Props)=> {
    const {deleteTodo, editTodo, list} = props

    const [todolist, setTodoList] = useState<todoT[]>([]) 

    useEffect(()=>{
        setTodoList(list)
    },[list])

    return(
        <div className={styles.container}>
            {todolist.map((todo: todoT)=>(
                <div className={styles.todo} key={todo.id}>
                    <span>{todo.description}</span> 
                    <div>
                        <BiEdit className={styles.button_edit} onClick={()=>editTodo(todo)}/>
                        <FaRegTrashCan className={styles.button_delete} onClick={()=>deleteTodo(todo.id)}/>
                    </div>
                    
                </div>
            ))}
        </div>
    )
}