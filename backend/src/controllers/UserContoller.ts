import  bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prismaClient } from '../database/prismaClient'
import { Request, Response, response } from 'express'
require('dotenv/config')


export class UserController{
    async login(request: Request, response: Response){
        const {email, password} = request.body
        const user = await prismaClient.user.findUnique({
            where: {
                email: email
            }
        })
        if(!user){
            return response.status(500).json({error: "Usuário não encontrado"})
        }else if(user && bcrypt.compareSync(password, user.password)){
            const AUTHSECRET = process.env.AUTHSECRET || ""
        
            const token = jwt.sign(user, AUTHSECRET,{
                expiresIn: "60s"
            })
            const {name, email} = user
            response.status(200).json({success: "Login efetuado com sucesso.",name, email, token})
        }
        else{
            return response.status(400).send({error: "Usuário/senha inválidos"})
        }
    }

    validateToken(request: Request, response: Response){
        const token = request.body.token || ""
        jwt.verify(token, process.env.AUTHSECRET || "", (err: any, decoded: any)=>{
            return response.status(200).send({valid: !err})
        })
    }

    async signup(request: Request, response: Response){
        const name: string = request.body.name || ""
        const email: string = request.body.email || ""
        const password: string = request.body.password || ""
        const confirmPassword: string = request.body.confirmPassword || ""

        const salt = bcrypt.genSaltSync()
        const passwordHash = bcrypt.hashSync(password, salt)
        if(!bcrypt.compareSync(confirmPassword, passwordHash)){
            return response.status(400).send({error: "Senhas não conferem"})
        }
        const user = await prismaClient.user.findUnique({
            where:{
                email
            }
        })
        if(user){
            return response.status(400).send({error: "Usuário já cadastrado"})
        }else{
            await prismaClient.user.create({
                data: {
                    name,
                    email,
                    password: passwordHash
                }
            })
            return response.status(200).send({success: "Usuário cadastrado com sucesso"})
        }
    }
}


