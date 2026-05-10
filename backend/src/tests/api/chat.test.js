import {
  describe,
  test,
  expect,
  jest,
} from "@jest/globals";

import request from "supertest";

// MOCK FIRST
jest.unstable_mockModule(
  "../../services/ollama.service.js",
  () => ({
    generateCompletion:
      async () => {
        return JSON.stringify({
          reply:
            "Mocked AI response",

          recommendations:
            [],

          end_of_conversation:
            true,
        });
      },
  })
);

// IMPORT APP AFTER MOCK
const { default: app } =
  await import(
    "../../app.js"
  );

describe(
  "POST /chat",
  () => {
    test(
      "should return recommendations",
      async () => {

        const response =
          await request(app)
            .post("/chat")
            .send({
              messages: [
                {
                  role: "user",

                  content:
                    "Need Java backend assessment",
                },
              ],
            });

        expect(
          response.status
        ).toBe(200);

        expect(
          response.body.reply
        ).toBeDefined();

        expect(
          Array.isArray(
            response.body
              .recommendations
          )
        ).toBe(true);
      },
      15000
    );
  }
);