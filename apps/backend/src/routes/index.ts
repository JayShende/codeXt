import express, { Router } from "express";
import testRoute from "./test.route.js";
import roomRoute from "./room.route.js";
import editorRoute from "./editor.route.js";

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
  {
    path: "/editor",
    route: editorRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
