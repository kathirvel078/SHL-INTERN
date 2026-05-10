import {
  retrieveAssessments,
} from "./retriever.service.js";

import {
  expandQuery,
} from "../utils/queryExpansion.js";

export const generateRecommendations =
  async (
    query
  ) => {

    // Expand query
    const expandedQuery =
      expandQuery(query);

    // Retrieve results
    let results =
      await retrieveAssessments(
        expandedQuery
      );

    // Remove duplicates
    const seen =
      new Set();

    results =
      results.filter(
        (result) => {
          const name =
            result.metadata
              ?.name;

          if (
            seen.has(name)
          ) {
            return false;
          }

          seen.add(name);

          return true;
        }
      );

    // Return top 5
    return results.slice(
      0,
      5
    );
  };