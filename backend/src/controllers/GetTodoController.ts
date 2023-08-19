import {Request, Response} from "express"
import { prismaClient } from "../database/prismaClient"

export class GetTodoController {
    async handle(request: Request, response: Response){
        const todos = await prismaClient.todo.findMany()
        response.status(200).json(todos)
    }
}
