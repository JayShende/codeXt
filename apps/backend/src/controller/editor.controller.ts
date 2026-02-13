import { Request, Response } from "express";
import HttpStatus from "http-status";
import { response } from "../utils/reponses.js";
import roomService from "../services/room.service.js";
import ApiError from "../utils/api-error.js";
import editorService from "../services/editor.service.js";

const updateEditorDefaultLanguage = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const language = await editorService.updateEditorDefaultLanguage(body);
    return response(
      res,
      HttpStatus.OK,
      "Language Updation Successfull",
      language,
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return response(res, error.statusCode, error.message, null);
    }
    return response(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Internal server error",
      null,
    );
  }
};

export default {
  updateEditorDefaultLanguage,
};
