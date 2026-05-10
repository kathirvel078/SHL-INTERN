import express from "express";

import {
  chatController,
} from "../controllers/chat.controller.js";

import {
  validate,
} from "../middleware/validate.middleware.js";

import {
  chatSchema,
} from "../validators/chat.validator.js";

const router =
  express.Router();

router.post(
  "/",
  validate(chatSchema),
  chatController
);

export default router;