import { useState, useEffect } from "react"
import {useNavigate} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import { api, getList } from "../../services/api"
import { TodoList } from "./TodoList"
import { TodoEdit } from "./TodoEdit"
import styles from "./styles/home.module.css"
import { todoT } from "../../types/todoTypes"
import {userKey} from "../../components/auth/Login"



export const Home = ()=>{
    const [inputValue, setInputValue] = useState('')
    const [open, setOpen] = useState(false)
    const [todoToEdit, setTodoToEdit] = useState<todoT>({id: 0, description: "",isdone: false})
    const [todoList, setTodoList] = useState<todoT[]>([])
    const storage = JSON.parse(localStorage.getItem(userKey)||"")
    const navigate = useNavigate()
    
    useEffect(()=>{
        // const list = async ()=>{
        //     const todos = await getList()
        //     setTodoList(todos.data)
        // }
       validateToken()
    },[])
    
    const list = async()=>{
        const todos = await getList()
        setTodoList(todos.data)
    }

    const validateToken = async ()=> {
        await api.post("/oapi/validateToken", {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia2FpIiwiZW1haWwiOiJrYWlAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkOE8zVEY0b0QxMWRERXg2d2kxS2hXZW5iZDFqMk1CQ01TRU93OHRBMFY2NmRab0xSS1BTYzYiLCJjcmVhdGVkX2F0IjoiMjAyMy0wOC0yOVQwMDo0MjozOC40MDdaIiwiaWF0IjoxNjkzNTMyNDA4LCJleHAiOjE2OTM2MTg4MDh9.ypkzJP5_1izRslQgER9INqRUofTVSD-7dY5luk8i_tI"})
            .then((resp)=> {
                console.log(storage.token);
                console.log(resp.data.valid);
                
                if(resp.data.valid){
                    api.defaults.headers.common["Authorization"] = storage.token
                    list()
                }else{
                    //localStorage.removeItem(userKey)
                    navigate("/")
                }
            })
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
    
