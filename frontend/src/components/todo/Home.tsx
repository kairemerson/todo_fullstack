import { useState, useEffect } from "react"
import { api, getList } from "../../services/api"
import { TodoList } from "./TodoList"
import { TodoEdit } from "./TodoEdit"
import styles from "./styles/home.module.css"
import { todoT } from "../../types/todoTypes"



export const Home = ()=>{
    const [inputValue, setInputValue] = useState('')
    const [open, setOpen] = useState(false)
    const [todoToEdit, setTodoToEdit] = useState<todoT>({id: 0, description: "",isdone: false})
    const [todoList, setTodoList] = useState<todoT[]>([])

    useEffect(()=>{
        const list = async ()=>{
            const todos = await getList()
            setTodoList(todos.data)
        }
        list()
    },[])
    
    const list = async()=>{
        const todos = await getList()
        setTodoList(todos.data)
    }

    const handleSubmit = async()=>{
       await api.post("/todo",{description: inputValue})
       setInputValue("")
       const todos = await getList()
       setTodoList(todos.data)
    }

    const deleteTodo = async(id: number)=>{
        await api.delete("/todo", { data: {id:id}})
        setInputValue("")
        const todos = await getList()
        setTodoList(todos.data)
    }

    const editTodo = (todo: todoT) =>{
        setTodoToEdit(todo)
        setOpen(true)
    }
    const changeOpen = ()=>{
        setOpen(!open)
    }
    
    return(
        <div className={styles.wrapper}>
            <div className={styles.input_form}>
                <input className={styles.input} type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>
                <button className={styles.button_add} onClick={handleSubmit}>Adicionar</button>
            </div>
            {todoList && (<TodoList deleteTodo={deleteTodo} editTodo={editTodo} list={todoList} />)}
            
            {open && (<TodoEdit todo={todoToEdit} changeOpen={changeOpen} list={list}/>)}
            
        </div>
    )
}
    
