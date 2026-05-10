import axios from "axios";

export const generateEmbedding =
  async (text) => {
    try {
      const response =
        await axios.post(
          "http://localhost:11434/api/embeddings",
          {
            model:
              "nomic-embed-text",

            prompt: text,
          }
        );

      return response.data.embedding;
    } catch (error) {
      console.error(error);

      throw new Error(
        "Embedding generation failed"
      );
    }
  };