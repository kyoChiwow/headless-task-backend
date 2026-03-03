import mongoose, { Schema } from "mongoose";
import { IFeedback } from "./feedback.interface";

const feedbackSchema = new Schema<IFeedback>(
  {
    name: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    sentiment: {
      type: String,
      required: true,
    },
    team: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const Feedback = mongoose.model("Feedback", feedbackSchema);
