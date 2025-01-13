import { body } from "express-validator";

export const createDescriptionValidator = () => {
  return [body("description").exists().withMessage("Description is required.")];
}
