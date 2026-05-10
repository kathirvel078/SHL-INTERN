import {
  describe,
  test,
  expect,
} from "@jest/globals";

import request from "supertest";

import app from "../../app.js";

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
      }
    );
  }
);