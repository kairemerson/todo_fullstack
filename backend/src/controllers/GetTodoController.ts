import {Request, Response} from "express"
import { prismaClient } from "../database/prismaClient"

export class GetTodoController {
    async handle(request: Request, response: Response){
        const todos = await prismaClient.todo.findMany()
        response.status(200).json(todos)
    }

    async relation(request: Request, response: Response){
        const email: string = request.body.email
        const user = await prismaClient.user.findUnique({
            where:{
                email
            },
            select:{
                todos: {
                    select:{
                        id: true,
                        description: true,
                        isdone: true,
                        created_at: true

                    }
                }
            }
             
        })
        response.json(user)
    }
}
