// import {
//   extractComparisonItems,
// } from "../../src/utils/comparison.js";
import {
  extractComparisonItems,
} from "../../utils/comparison.js";

describe(
  "Comparison Extraction",
  () => {
    test(
      "should extract two assessments",
      () => {
        const items =
          extractComparisonItems(
            "Compare OPQ and GSA"
          );

        expect(
          items.length
        ).toBe(2);
      }
    );
  }
);