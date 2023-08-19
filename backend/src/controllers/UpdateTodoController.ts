import {Request, Response} from "express"
import { prismaClient } from "../database/prismaClient"

export class UpdateTodoController {
    async handle(request: Request, response: Response){
        const { id, description, isdone} = request.body
        const newTodo = await prismaClient.todo.update({
            where: {
                id: id
            },
            data: {
                description,
                isdone
            }
        })
        return response.status(200).json(newTodo)
    }
}