import {
  retrieveAssessments,
} from "../services/retriever.service.js";

const test =
  async () => {
    const results =
      await retrieveAssessments(
        "Java backend developer"
      );

    console.log(
      JSON.stringify(
        results,
        null,
        2
      )
    );
  };

test();