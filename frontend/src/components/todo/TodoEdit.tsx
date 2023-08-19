import {useState, useEffect} from "react"
import { todoT } from "../../types/todoTypes"
import styles  from "./styles/todoEdit.module.css"
import { api } from "../../services/api"

interface Props {
    todo: todoT,
    changeOpen: ()=> void,
    list: ()=> void
}

export const TodoEdit = (props: Props)=>{
    const [inputValue, setInputValue] = useState("")
    const {todo, changeOpen, list} = props;

    useEffect(()=>{
        setInputValue(todo.description)
    },[])

    const editSubmit = async()=>{
        let {id, isdone} = todo
        await api.put("/todo", {id,description: inputValue, isdone})
        list()
        changeOpen()
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