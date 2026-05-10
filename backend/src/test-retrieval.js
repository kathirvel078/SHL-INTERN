import {
  retrieveAssessments,
} from "./services/retriever.service.js";

const test =
  async () => {

    const results =
      await retrieveAssessments(
        "OPQ"
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