import { Router } from "express";
import { FeedbackController } from "./feedback.controller";

const router = Router();

router.post("/create-feedback", FeedbackController.createFeedback);
router.get("/get-feedback", FeedbackController.getFeedback);

export const FeedbackRoutes = router;