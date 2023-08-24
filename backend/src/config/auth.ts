import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

module.exports = (request: Request,response: Response, next: NextFunction)=>{
    if(request.method === 'OPTIONS'){
        next()
    } else {
        const token = request.body.token || request.query.token || request.headers["authorization"]

        if(!token){
            return response.status(403).send({error: "No token provided"})
        }
        jwt.verify(token, process.env.AUTHSECRET || '', (err: any, decoded:any)=>{
            if(err){
                return response.status(403).send({error: 'Failed to authenticate token'})
            } else {
                next()
            }
        })
    }
}