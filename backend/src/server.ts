import express  from "express";
import cors from "cors";
import { router } from "./routes";

const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

app.listen(4003, ()=>{
    console.log("server is running on port 4003")
})