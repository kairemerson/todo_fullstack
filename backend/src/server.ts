import express  from "express";
import cors from "cors";
//import { router } from "./routes";

const server = express()

server.use(express.json())
server.use(cors())
//server.use(router)

server.listen(4003, ()=>{
    console.log("server is running on port 4003")
})

module.exports = server