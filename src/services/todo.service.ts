import { TodoEntity } from "../entities";
import { AppDataSouce } from "../db";

export const createTodo = async (data) => {
  const { title, description, status, user, dueDate } = data;
  const todoRepository = AppDataSouce.getRepository(TodoEntity);
  const todo = todoRepository.create({ title, description, dueDate, status, user });
  await todoRepository.save(todo);
  return todo;
};

export const getTodosByUserId = async (userId) => {
  const todoRepository = AppDataSouce.getRepository(TodoEntity);
  const todos = await todoRepository.find({ where: { user: { uuid: userId } } });
  if (!todos) return null;
  return todos;
};

export const updateTodo = async (todoId, data) => {
  const todoRepository = AppDataSouce.getRepository(TodoEntity);
  const todo = await todoRepository.findOne({ where: { uuid: todoId } });
  if (!todo) return null;
  Object.assign(todo, data);
  await todoRepository.save(todo);
  return todo;
};

export const deleteTodoById = async (uuid) => {
  const todoRepository = AppDataSouce.getRepository(TodoEntity);
  const todo = await todoRepository.findOne({ where: { uuid } });
  if (!todo) return null;
  await todoRepository.remove(todo);
  return todo;
};
