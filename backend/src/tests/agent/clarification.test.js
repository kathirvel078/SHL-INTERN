import {
  needsClarification,
} from "../../utils/conversation.js";
// import {
//   needsClarification,
// } from "../../src/utils/conversation.js";

describe(
  "Clarification Detection",
  () => {
    test(
      "should detect vague queries",
      () => {
        const result =
          needsClarification(
            "Need assessment"
          );

        expect(
          result
        ).toBe(true);
      }
    );
  }
);