import {
  detectIntent,
} from "../utils/intentDetector.js";

import {
  getLastUserMessage,
  needsClarification,
} from "../utils/conversation.js";

import {
  buildClarificationResponse,
} from "../utils/clarification.js";

import {
  buildRefusalResponse,
} from "../utils/refusal.js";

import {
  buildContext,
} from "../utils/contextBuilder.js";

import {
  buildPrompt,
} from "../utils/promptBuilder.js";

import {
  generateCompletion,
} from "../services/ollama.service.js";

import {
  safeJsonParse,
} from "../utils/jsonParser.js";

import {
  isPromptInjection,
  isOffTopic,
  isUnsafeRequest,
} from "../utils/security.js";

import {
  generateRecommendations,
} from "../services/recommendation.service.js";

import {
  buildRecommendationReply,
} from "../utils/replyBuilder.js";

import {
  formatRecommendations,
} from "../utils/recommendationFormatter.js";

import {
  compareAssessments,
} from "../services/comparison.service.js";

export const processConversation =
  async (messages) => {

    // Get latest user message
    const lastMessage =
      getLastUserMessage(messages);

    if (!lastMessage) {
      return {
        reply:
          "No user message found.",

        recommendations: [],

        end_of_conversation: true,
      };
    }

    // Extract content
    const content =
      lastMessage.content;

    // Detect intent
    const intent =
      detectIntent(content);

    console.log(
      "Detected Intent:",
      intent
    );

    // Prompt injection protection
    if (
      isPromptInjection(content)
    ) {
      return buildRefusalResponse(
        "injection"
      );
    }

    // Unsafe request protection
    if (
      isUnsafeRequest(
        content
      )
    ) {
      return buildRefusalResponse(
        "unsafe"
      );
    }

    // Off-topic protection
    if (
      isOffTopic(content)
    ) {
      return buildRefusalResponse(
        "off_topic"
      );
    }

    // Explicit refusal intent
    if (
      intent === "refusal"
    ) {
      return buildRefusalResponse();
    }

    // Comparison workflow
    if (
      intent === "comparison"
    ) {
      return await compareAssessments(
        content
      );
    }

    // Clarification workflow
    if (
      needsClarification(
        content
      )
    ) {
      return buildClarificationResponse();
    }

    // Generate recommendations
    const results =
      await generateRecommendations(
        content
      );

    // Empty retrieval handling
    if (
      results.length === 0
    ) {
      return {
        reply:
          "No relevant SHL assessments found.",

        recommendations: [],

        end_of_conversation: true,
      };
    }

    // Format recommendations
    const recommendations =
      formatRecommendations(
        results
      );

    // Build retrieval context
    const context =
      buildContext(results);

    // Build prompt
    const prompt =
      buildPrompt({
        query: content,
        context,
      });

    // Generate AI response
    const aiResponse =
      await generateCompletion(
        prompt
      );

    console.log(
      "Raw AI Response:",
      aiResponse
    );

    // Parse safely
    const parsed =
      safeJsonParse(
        aiResponse
      );

    // Fallback if invalid JSON
    if (!parsed) {
      return {
        reply:
          buildRecommendationReply(
            content,
            recommendations.length
          ),

        recommendations,

        end_of_conversation: true,
      };
    }

    // Ensure recommendations exist
    parsed.recommendations =
      recommendations;

    return parsed;
  };