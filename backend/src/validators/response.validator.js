import { z } from "zod";

export const responseSchema =
  z.object({
    reply:
      z.string(),

    recommendations:
      z.array(
        z.object({
          name:
            z.string(),

          url:
            z.string(),

          test_type:
            z.string(),
        })
      ),

    comparison:
      z
        .object({
          assessment_1:
            z.string(),

          assessment_2:
            z.string(),

          differences:
            z.array(
              z.string()
            ),
        })
        .optional(),

    end_of_conversation:
      z.boolean(),
  });