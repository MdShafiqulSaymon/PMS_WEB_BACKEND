import { Router } from "express";

import userRouter from "../../user/users.route.js";
const router = Router();

const defaultRoutes = [
  {
    route: userRouter,
  },
  {
    path: "/work-orders",
    route: userRouter,
  }
];

defaultRoutes.forEach(route => {
  if (!!route?.path) {
    router.use(route.path, route.route);
  } else {
    router.use(route.route);
  }
});

router.get("", (req, res) => {
  res.send("<h1>hi</h1>");
});

export default router;
