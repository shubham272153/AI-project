import express from "express";
import { protect } from "../middlewares/auth.js";
import {
  createChat,
  deteleChat,
  getChat,
} from "../controllers/chatController.js";

const chatRouter = express.Router();

chatRouter.get("/create", protect, createChat);
chatRouter.get("/get", protect, getChat);
chatRouter.post("/delete", protect, deteleChat);

export default chatRouter;
