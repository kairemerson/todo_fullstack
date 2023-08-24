import {Request, Response} from "express"
import {prismaClient} from "../database/prismaClient"

export class CreateTodoController{
    
    async handle(request: Request, response: Response){
        const {description , isdone = false} = request.body
        const todo = await prismaClient.todo.create({
            data:{
                description,
                isdone
            }
        })
        return response.status(201).json(todo)
    }
    
}