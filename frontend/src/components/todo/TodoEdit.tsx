import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import { todoT } from "../../types/todoTypes"
import styles  from "./styles/todoEdit.module.css"
import { api } from "../../services/api"
import {userKey} from "../../components/auth/Login"

interface Props {
    todo: todoT,
    changeOpen: ()=> void,
    list: ()=> void
}

export const TodoEdit = (props: Props)=>{
    const [inputValue, setInputValue] = useState("")
    const {todo, changeOpen, list} = props;
    const storage = localStorage.getItem(userKey)|| ""
    const userParse = storage ? JSON.parse(storage) : {token: ""}
    const navigate = useNavigate()

    useEffect(()=>{
        setInputValue(todo.description)
    },[])

    const editSubmit = async()=>{

        await api.post("/oapi/validateToken", {"token": userParse.token})
            .then(async (resp)=>{
                if(resp.data.valid){
                    let {id, isdone} = todo
                    await api.put("/api/todo", {id,description: inputValue, isdone})
                    list()
                    changeOpen()

                }else{
                    localStorage.removeItem(userKey)
                    navigate("/")
                }
            })

    }
    return(
        <div className={styles.wrapper}>
            <div className={styles.editForm}>
                <button className={styles.close} onClick={changeOpen}>X</button>
                <input type="text"className={styles.editInput} 
                value={inputValue} 
                onChange={(e)=>setInputValue(e.target.value)}/> 
                <button className={styles.editButton} onClick={()=>editSubmit()}>Editar</button>
            </div>
        </div>
    )
}