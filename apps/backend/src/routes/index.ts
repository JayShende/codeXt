import express, { Router } from "express";
import testRoute from "./test.route.js";
import roomRoute from "./room.route.js";

const router: Router = express.Router();

const defaultRoutes = [
  {
    path: "/test",
    route: testRoute,
  },
  {
    path: "/room",
    route: roomRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
