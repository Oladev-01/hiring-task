import { body } from "express-validator";

export const createDueDateValidator = () => [
    body("dueDate")
    .exists().withMessage("Due date is required")
    .isISO8601().toDate().withMessage("Due date must be a valid date"),
  ];
