import cors from "cors";
import express, { Request, Response } from "express";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to Headless Task!"
    })
});

export default app;