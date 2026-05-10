import {
  generateEmbedding,
} from "./services/embedding.service.js";

const test = async () => {
  try {
    const embedding =
      await generateEmbedding(
        "Java backend developer"
      );

    console.log(
      "Embedding length:",
      embedding.length
    );

    console.log(
      "First 5 values:",
      embedding.slice(0, 5)
    );
  } catch (error) {
    console.error(error);
  }
};

test();