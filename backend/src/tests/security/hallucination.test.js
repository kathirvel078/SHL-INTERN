import {
  validateRecommendations,
} from "../../utils/responseGuard.js";

describe(
  "Hallucination Prevention",
  () => {
    test(
      "should remove fake recommendations",
      () => {
        const recommendations =
          [
            {
              name:
                "Fake Assessment",
            },
          ];

        const retrieved =
          [
            {
              metadata: {
                name:
                  "Java Test",
              },
            },
          ];

        const validated =
          validateRecommendations(
            recommendations,
            retrieved
          );

        expect(
          validated.length
        ).toBe(0);
      }
    );
  }
);