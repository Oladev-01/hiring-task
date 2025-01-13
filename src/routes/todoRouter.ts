import { Router } from "express";
import { TodoValidator } from "../validators";
import { TodoController } from "../controllers";
import { authenticate } from "../middlewares";

export const todoRouter = Router();

todoRouter.post(
  "/",
  authenticate,
  TodoValidator.createTodoValidator(),
  TodoController.createTodoController
);
  
todoRouter.get(
  "/",
  authenticate,
  TodoController.getTodosController
);

todoRouter.put(
  "/:todoId",
  authenticate,
  TodoValidator.updateTodoValidator(),
  TodoController.updateTodoController
);

todoRouter.delete(
  "/:uuid",
  TodoController.deleteTodoController
);
