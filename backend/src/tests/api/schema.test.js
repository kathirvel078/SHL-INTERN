import {
  responseSchema,
} from "../../validators/response.validator.js";

describe(
  "Response Schema",
  () => {
    test(
      "should validate correct response",
      () => {
        const valid = {
          reply: "Hello",

          recommendations:
            [],

          end_of_conversation: true,
        };

        const result =
          responseSchema.safeParse(
            valid
          );

        expect(
          result.success
        ).toBe(true);
      }
    );
  }
);