import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:4003"
})

export const getList = async()=>{
    const todos = await api.get("/api/todos")
    return todos
}