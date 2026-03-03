import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { FeedbackService } from "./feedback.service";

const createFeedback = catchAsync(async (req: Request, res: Response) => {
  const result = await FeedbackService.createFeedbackService(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Feedback created successfully",
    data: result,
  });
});

const getFeedback = catchAsync(async (req: Request, res: Response) => {
  const result = await FeedbackService.getFeedbackService(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Feedback fetched successfully",
    data: result,
  });
});

export const FeedbackController = { createFeedback, getFeedback };
