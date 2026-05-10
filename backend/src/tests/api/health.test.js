import {
  describe,
  test,
  expect,
} from "@jest/globals";

import request from "supertest";

import app from "../../app.js";

describe(
  "GET /health",
  () => {
    test(
      "should return healthy response",
      async () => {
        const response =
          await request(app)
            .get("/health");

        expect(
          response.status
        ).toBe(200);

        expect(
          response.body.success
        ).toBe(true);
      }
    );
  }
);