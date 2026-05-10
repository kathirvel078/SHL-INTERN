import {
  processConversation,
} from "../agents/conversation.agent.js";

export const chatController =
  async (req, res, next) => {
    try {
      const { messages } =
        req.body;

      const response =
        await processConversation(
          messages
        );

      return res
        .status(200)
        .json(response);
    } catch (error) {
      next(error);
    }
  };