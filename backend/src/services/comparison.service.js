import {
  retrieveAssessments,
} from "./retriever.service.js";

import {
  extractComparisonItems,
} from "../utils/comparison.js";

import {
  buildComparisonContext,
} from "../utils/comparisonContext.js";

import {
  buildComparisonPrompt,
} from "../utils/comparisonPrompt.js";

import {
  generateCompletion,
} from "./ollama.service.js";

import {
  safeJsonParse,
} from "../utils/jsonParser.js";

import fs from "fs/promises";

// Retrieve ONE exact assessment
const retrieveSingleAssessment =
  async (
    assessmentName
  ) => {

    // Load dataset directly
    const raw =
      await fs.readFile(
        "./src/data/shl_catalog.json",
        "utf-8"
      );

    const data =
      JSON.parse(raw);

    // Normalize search
    const normalizedSearch =
      assessmentName
        .toLowerCase()
        .trim();

    // Exact match
    const assessment =
      data.find(
        (item) => {

          const normalizedName =
            item.name
              ?.toLowerCase()
              .trim();

          return (
            normalizedName ===
            normalizedSearch
          );
        }
      );

    if (!assessment) {
      return null;
    }

    // Convert into retriever-like format
    return {
      document: `
Name:
${assessment.name}

Description:
${assessment.description}

Skills:
${assessment.skills?.join(", ")}

Categories:
${assessment.categories?.join(", ")}

Test Type:
${assessment.test_type}
      `,

      metadata: {
        name:
          assessment.name,

        url:
          assessment.url,

        test_type:
          assessment.test_type,
      },

      score: 1,
    };
};

// Main comparison workflow
export const compareAssessments =
  async (query) => {

    // Extract names
    const items =
      extractComparisonItems(
        query
      );

    console.log(
      "Comparison Items:",
      items
    );

    // Validate extraction
    if (
      items.length < 2
    ) {
      return {
        reply:
          "Please provide two assessments to compare.",

        recommendations: [],

        end_of_conversation: true,
      };
    }

    // Retrieve assessment A
    const assessmentA =
      await retrieveSingleAssessment(
        items[0]
      );

    // Retrieve assessment B
    const assessmentB =
      await retrieveSingleAssessment(
        items[1]
      );

    console.log(
      "Assessment A:",
      assessmentA?.metadata
        ?.name
    );

    console.log(
      "Assessment B:",
      assessmentB?.metadata
        ?.name
    );

    // Missing assessment handling
    if (
      !assessmentA ||
      !assessmentB
    ) {
      return {
        reply:
          "Unable to find both assessments for comparison.",

        recommendations: [],

        end_of_conversation: true,
      };
    }

    // Build grounded context
    const context =
      buildComparisonContext(
        assessmentA,
        assessmentB
      );

    // Build prompt
    const prompt =
      buildComparisonPrompt({
        query,
        context,
      });

    console.log(
      "Comparison Prompt:",
      prompt
    );

    // Generate LLM response
    const response =
      await generateCompletion(
        prompt
      );

    console.log(
      "Raw Comparison Response:",
      response
    );

    // Parse safely
    const parsed =
      safeJsonParse(
        response
      );

    // Invalid JSON fallback
    if (!parsed) {
      return {
        reply:
          "Failed to generate comparison response.",

        recommendations: [],

        end_of_conversation: true,
      };
    }

    return parsed;
};