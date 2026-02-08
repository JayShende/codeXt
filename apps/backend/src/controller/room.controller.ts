import { Request, Response } from "express";
import HttpStatus from "http-status";
import { response } from "../utils/reponses.js";
import roomService from "../services/room.service.js";
import ApiError from "../utils/api-error.js";

const createRoom = async (req: Request, res: Response) => {
  try {
    const room = await roomService.createRoom(req.user?.id!);
    return response(res, HttpStatus.OK, "Room Creation Successfull", room);
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
  createRoom,
};
