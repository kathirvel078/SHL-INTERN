import {
  describe,
  test,
  expect,
} from "@jest/globals";

import {
  retrieveAssessments,
} from "../../services/retriever.service.js";

describe(
  "Retriever",
  () => {
    test(
      "should retrieve Java assessments",
      async () => {
        const results =
          await retrieveAssessments(
            "Java backend developer"
          );

        console.log(results);

        expect(
          results.length
        ).toBeGreaterThan(
          0
        );
      }
    );
  }
);