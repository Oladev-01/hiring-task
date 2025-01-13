import { todoService, userService } from "../services";
import { errorHandlerWrapper } from "../utils";
import httpStatus from "http-status";

const createTodoHandler = async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const userId = req.user.uuid;

  const findUser = await userService.getOneUser({ uuid: userId });
  if (!findUser) return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });

  const newTodo = await todoService.createTodo({
    title,
    description,
    dueDate,
    status,
    user: findUser,
  });

  res.status(httpStatus.CREATED).json(newTodo);
};

const getTodosHandler = async (req, res) => {
  const userId = req.user.uuid;

  const todos = await todoService.getTodosByUserId(userId);
  if (!todos) return res.status(httpStatus.NOT_FOUND).json({ message: "Todos not found" });

  res.status(httpStatus.OK).json(todos);
};

const updateTodoHandler = async (req, res) => {
  const { todoId } = req.params;
  const { title, description, status, dueDate } = req.body;

  const updatedTodo = await todoService.updateTodo(todoId, {
    title,
    description,
    dueDate,
    status,
  });

  if (!updatedTodo) return res.status(httpStatus.NOT_FOUND).json({ message: "Todo not found" });

  res.status(httpStatus.OK).json(updatedTodo);
};

const deleteTodoHandler = async (req, res) => {
  const { uuid } = req.params;

  const deletedTodo = await todoService.deleteTodoById(uuid);
  if (!deletedTodo) return res.status(httpStatus.NOT_FOUND).json({ message: "Todo not found" });

  res.status(httpStatus.NO_CONTENT).send();
};

export const createTodoController = errorHandlerWrapper(createTodoHandler);
export const getTodosController = errorHandlerWrapper(getTodosHandler);
export const updateTodoController = errorHandlerWrapper(updateTodoHandler);
export const deleteTodoController = errorHandlerWrapper(deleteTodoHandler);