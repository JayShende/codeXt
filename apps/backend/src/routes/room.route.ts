import express, { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import roomController from "../controller/room.controller.js";
import { validate } from "../middlewares/validate.js";
import roomValidator from "../validators/room.validator.js";

const router: Router = express.Router();

router.post(
  "/createRoom",
  isAuthenticated,
  validate(roomValidator.createRoom),
  roomController.createRoom,
);
router.get("/getRoomDetails/:roomSlug", roomController.roomDetails);

router.get(
  "/getAllUserRoomsData",
  isAuthenticated,
  roomController.allUserRoomsData,
);

router.post(
  "/deleteRoom",
  isAuthenticated,
  validate(roomValidator.deleteRoom),
  roomController.deleteRoom,
);
export default router;
