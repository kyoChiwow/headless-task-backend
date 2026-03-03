import { Router } from "express";
import { FeedbackRoutes } from "../modules/Feedback/feedback.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/feedback",
    route: FeedbackRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
