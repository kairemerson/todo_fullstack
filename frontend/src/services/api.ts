import axios from "axios"
import {toast} from "react-toastify"
import { userKey } from "../components/auth/Login"

export const api = axios.create({
    baseURL: "http://localhost:4003"
})

export const getList = async()=>{
    const storage = localStorage.getItem(userKey)|| ""
    const userParse = storage ? JSON.parse(storage) : {}

    try{
        const todos = await api.post("/api/todos",{email: userParse.email, token: userParse.token})
        
        return todos

    }catch(error:any){
        toast.error(error.response.data.error, {toastId:"getList"} )
    }
}