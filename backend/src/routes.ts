import express from "express"; 
const auth = require("./config/auth")
import { CreateTodoController } from "./controllers/CreateTodoController";
import { GetTodoController } from "./controllers/GetTodoController";
import { UpdateTodoController } from "./controllers/UpdateTodoController";
import { DeleteTodoController } from "./controllers/DeleteTodoController";
import { UserController } from "./controllers/UserContoller";

module.exports = function(server:any){
    //rotas protegidas por token
    const protectedApi = express.Router()
    server.use('/api', protectedApi)

    //protectedApi.use(auth)

    const createTodo = new CreateTodoController()
    const getTodo = new GetTodoController()
    const updateTodo = new UpdateTodoController()
    const deleteTodo = new DeleteTodoController()

    protectedApi.post("/todo", createTodo.handle)
    protectedApi.get("/todos", getTodo.handle)
    protectedApi.put("/todo", updateTodo.handle)
    protectedApi.delete("/todo", deleteTodo.handle)

    //Rotas abertas
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const userController = new UserController()
    openApi.post("/login", userController.login)
    openApi.post("/signup", userController.signup)
    openApi.post("/validateToken", userController.validateToken)

}
// const router = Router()

// const createTodo = new CreateTodoController()
// const getTodo = new GetTodoController()
// const updateTodo = new UpdateTodoController()
// const deleteTodo = new DeleteTodoController()

// router.post("/todo", createTodo.handle)
// router.get("/todos", getTodo.handle)
// router.put("/todo", updateTodo.handle)
// router.delete("/todo", deleteTodo.handle)

// export {router} 