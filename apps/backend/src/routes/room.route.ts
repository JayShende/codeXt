import express, { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import roomController from "../controller/room.controller.js";

const router: Router = express.Router();

router.post("/createRoom", isAuthenticated, roomController.createRoom);

export default router;
