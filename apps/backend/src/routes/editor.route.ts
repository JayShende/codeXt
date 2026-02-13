import express, { Router } from "express";
import editorController from "../controller/editor.controller.js";
import { validate } from "../middlewares/validate.js";
import editorValidator from "../validators/editor.validator.js";

const router: Router = express.Router();

router.post(
  "/updateEditorDefaultLanguage",
  validate(editorValidator.updateLanguageBody),
  editorController.updateEditorDefaultLanguage,
);

export default router;
