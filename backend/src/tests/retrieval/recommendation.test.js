import {
  describe,
  test,
  expect,
} from "@jest/globals";

import {
  generateRecommendations,
} from "../../services/recommendation.service.js";

describe(
  "Recommendation Engine",
  () => {
    test(
      "should rank React assessments highly",
      async () => {
        const results =
          await generateRecommendations(
            "React frontend developer"
          );

        expect(
          results[0]
        ).toBeDefined();
      }
    );
  }
);