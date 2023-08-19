import {Request, Response} from "express"
import {prismaClient} from "../database/prismaClient"

export class DeleteTodoController {
    async handle(request: Request, response:Response){
        const {id} = request.body
        await prismaClient.todo.delete({
            where:{
                id: id
            }
        })
        return response.status(200).send("todo deletado")
    }
}