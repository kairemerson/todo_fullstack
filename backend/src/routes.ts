import { Router } from "express"; 
import { CreateTodoController } from "./controllers/CreateTodoController";
import { GetTodoController } from "./controllers/GetTodoController";
import { UpdateTodoController } from "./controllers/UpdateTodoController";
import { DeleteTodoController } from "./controllers/DeleteTodoController";

const router = Router()

const createTodo = new CreateTodoController()
const getTodo = new GetTodoController()
const updateTodo = new UpdateTodoController()
const deleteTodo = new DeleteTodoController()

router.post("/todo", createTodo.handle)
router.get("/todos", getTodo.handle)
router.put("/todo", updateTodo.handle)
router.delete("/todo", deleteTodo.handle)

export {router} 