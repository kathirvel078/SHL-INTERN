import fs from "fs/promises";

import { v4 as uuidv4 }
  from "uuid";

import {
  generateEmbedding,
} from "../services/embedding.service.js";

import {
  getCollection,
} from "../services/chroma.service.js";

import {
  buildChunk,
} from "../utils/chunkBuilder.js";

const loadDataset =
  async () => {
    const raw =
      await fs.readFile(
        "./src/data/shl_catalog.json",
        "utf-8"
      );

    return JSON.parse(raw);
  };

const ingestData =
  async () => {
    const collection =
      await getCollection();

    const assessments =
      await loadDataset();

    for (const assessment of assessments) {
      const chunk =
        buildChunk(
          assessment
        );

      const embedding =
        await generateEmbedding(
          chunk
        );

      await collection.add({
        ids: [uuidv4()],

        documents: [chunk],

        embeddings: [embedding],

        metadatas: [
          {
            name:
              assessment.name,

            url:
              assessment.url,

            test_type:
              assessment.test_type,
          },
        ],
      });

      console.log(
        `Stored: ${assessment.name}`
      );
    }

    console.log(
      "Ingestion complete"
    );
  };

ingestData();