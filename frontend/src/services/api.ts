import axios from "axios"
import {toast} from "react-toastify"

export const api = axios.create({
    baseURL: "http://localhost:4003"
})

export const getList = async()=>{
    try{
        const todos = await api.get("/api/todos")
        
        return todos

    }catch(error:any){
        toast.error(error.response.data.error, {toastId:"getList"} )
    }
}