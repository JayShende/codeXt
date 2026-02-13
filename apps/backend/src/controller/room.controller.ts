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

const roomDetails = async (req: Request, res: Response) => {
  try {
    const rawSlug = req.params.roomSlug;
    const roomSlug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;
    if (!roomSlug) {
      throw new ApiError(HttpStatus.BAD_REQUEST, "Room Slug is required");
    }
    const details = await roomService.roomDetails(roomSlug);
    return response(
      res,
      HttpStatus.OK,
      "Room Details Fetch Successfull",
      details,
    );
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      return response(res, error.statusCode, error.message, null);
    }
    return response(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Internal server error",
      error,
    );
  }
};

export default {
  createRoom,
  roomDetails,
};
