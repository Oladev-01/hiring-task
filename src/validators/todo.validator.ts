import { body } from "express-validator";
import { createTitleValidator } from "./title";
import { createDescriptionValidator } from "./description";
import { createStatusValidator } from "./status";
import { createDueDateValidator } from "./dueDate";

export const createTodoValidator = () => [
  ...createTitleValidator(),
  ...createDescriptionValidator(),
  ...createDueDateValidator(),
  ...createStatusValidator(),
];

export const updateTodoValidator = () => [
  body("title").optional().isString().withMessage("Title must be a string"),
  body("description").optional().isString().withMessage("Description must be a string"),
  body("dueDate").optional().isISO8601().toDate().withMessage("Due date must be a valid date"),
  body("status").optional().isBoolean().withMessage("Status must be a boolean"),
];
