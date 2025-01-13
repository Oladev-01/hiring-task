import { body } from "express-validator";

export const createStatusValidator = () => {
  return [body("status").exists().withMessage("Status is required.")
    .isBoolean().withMessage("Status must be a boolean"),
  ];
};
