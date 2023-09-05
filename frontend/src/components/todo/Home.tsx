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
    const navigate = useNavigate()
    const storage = localStorage.getItem(userKey)|| ""
    const userParse = storage ? JSON.parse(storage) : {token: ""}
   
    useEffect(()=>{
       validateToken()
    },[])
    
    const list = async()=>{
        const todos = await getList()
        setTodoList(todos.data)
    }

    const validateToken = async ()=> {
        try {
            
            await api.post("/oapi/validateToken", {"token": userParse.token})
                .then((resp)=> {
                    console.log("valid",resp.data.valid);
                    
                    if(resp.data.valid){
                        api.defaults.headers.common["Authorization"] = userParse.token
                        list()
                    }else{
                        localStorage.removeItem(userKey)
                        navigate("/")
                    }
                })
            
        } catch (error) {
            console.log("error",error);
            
        }
    }

    const handleSubmit = async()=>{

        await api.post("/oapi/validateToken", {"token": userParse.token})
            .then(async (resp)=>{
                if(resp.data.valid){
                    await api.post("/api/todo",{description: inputValue})
                    setInputValue("")
                    list()
                }else{
                    localStorage.removeItem(userKey)
                    navigate("/")
                }
            })
        
    }

    const deleteTodo = async(id: number)=>{

        await api.post("/oapi/validateToken", {"token": userParse.token})
            .then(async (resp)=>{
                if(resp.data.valid){
                    await api.delete("/api/todo", { data: {id:id}})
                    setInputValue("")
                    list()
                }else{
                    localStorage.removeItem(userKey)
                    navigate("/")
                }
            })
    }

    const editTodo = async (todo: todoT) =>{
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
    
