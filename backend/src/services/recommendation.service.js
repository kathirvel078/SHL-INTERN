import axios from "axios";
import {
  retrieveAssessments,
} from "./retriever.service.js";

import {
  expandQuery,
} from "../utils/queryExpansion.js";

import {
  scoreResults,
  filterWeakResults,
  deduplicateResults,
  sortResultsByConfidence,
} from "../utils/recommendationHelpers.js";



const OLLAMA_URL =
  "http://localhost:11434";


  export const generateCompletion =
  async (prompt) => {
    const response =
      await axios.post(
        `${OLLAMA_URL}/api/generate`,
        {
          model: "llama3",

          prompt,

          stream: false,
        }
      );

    return response.data.response;
  };

  export const generateRecommendations =
  async (
    query
  ) => {
    const expandedQuery =
      expandQuery(query);

    let results =
      await retrieveAssessments(
        expandedQuery
      );

    results =
      scoreResults(
        results,
        expandedQuery
      );

    results =
      filterWeakResults(
        results
      );

    results =
      deduplicateResults(
        results
      );

    results =
      sortResultsByConfidence(
        results
      );

    return results.slice(
      0,
      5
    );
  };

  