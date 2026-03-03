/* eslint-disable @typescript-eslint/no-explicit-any */
import { analyzeFeedback } from "../../ai/langchain";
import { Feedback } from "./feedback.model";

const createFeedbackService = async (payload: any) => {
  const aiData = await analyzeFeedback(payload.message);

  const feedback = await Feedback.create({
    ...payload,
    ...aiData,
  });

  return feedback;
};

const getFeedbackService = async (query: any) => {
  const filter: any = {};

  if (query.name) {
    filter.name = { $regex: query.name, $options: "i" };
  }

  if (query.category) {
    filter.category = { $regex: query.category, $options: "i" };
  }

  if (query.priority) {
    filter.priority = { $regex: query.priority, $options: "i" };
  }

  const feedback = await Feedback.find(filter).sort({ createdAt: -1 });

  return feedback;
};

export const FeedbackService = {
  createFeedbackService,
  getFeedbackService,
};
