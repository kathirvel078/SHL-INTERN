import { ChromaClient }
  from "chromadb";

const client =
  new ChromaClient({
    host: "localhost",
    port: 8000,
    ssl: false,
  });

export const getCollection =
  async () => {
    const collection =
      await client.getOrCreateCollection(
        {
          name:
            "shl_assessments",

          embeddingFunction:
            null,
        }
      );

    return collection;
  };