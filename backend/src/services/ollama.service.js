import axios from "axios";

const OLLAMA_URL =
  "http://localhost:11434";

export const generateCompletion =
  async (
    prompt,
    retries = 2
  ) => {
    for (
      let attempt = 1;
      attempt <= retries;
      attempt++
    ) {
      try {
        const response =
          await axios.post(
            `${OLLAMA_URL}/api/generate`,
            {
              model: "llama3.2",

              prompt,

              stream: false,

              options: {
                temperature: 0.2,
                top_p: 0.9,
              },
            },
            {
              timeout: 20000,
            }
          );

        return response.data
          .response;
      } catch (error) {
        console.log(
          `LLM retry ${attempt}`
        );

        if (
          attempt === retries
        ) {
          throw error;
        }
      }
    }
  };