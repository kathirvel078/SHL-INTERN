import {
  generateEmbedding,
} from "./embedding.service.js";

import {
  getCollection,
} from "./chroma.service.js";

const formatResults = (
  results
) => {
  const documents =
    results.documents?.[0] || [];

  const metadatas =
    results.metadatas?.[0] || [];

  const distances =
    results.distances?.[0] || [];

  return documents
    .map(
      (
        document,
        index
      ) => ({
        document,

        metadata:
          metadatas[index],

        score:
      distances[index] === undefined
        ? 0
        : 1 /
          (1 +
            distances[index]),
  })
    )

    .filter(
      (item) =>
        item.score > 0
    );
};

export const semanticSearch =
  async (
    query,
    limit = 5
  ) => {
    const collection =
      await getCollection();

   const embedding =
  await generateEmbedding(
    query
  );

const results =
  await collection.query({
    queryEmbeddings: [
      embedding,
    ],

    nResults: limit,
  });

    return formatResults(
      results
    );
  };

export const retrieveWithRetry =
  async (query) => {
    let results =
      await semanticSearch(
        query
      );

    if (
      results.length === 0
    ) {
      console.log(
        "Retrying retrieval..."
      );

      results =
        await semanticSearch(
          `${query} assessment`
        );
    }

    return results;
  };

export const filterResultsByType =
  (
    results,
    type
  ) => {
    return results.filter(
      (item) =>
        item.metadata
          ?.test_type === type
    );
  };

const keywordMatchScore =
  (
    query,
    document
  ) => {
    const queryWords =
      query
        .toLowerCase()
        .split(/\s+/);

    const docLower =
      document.toLowerCase();

    let matches = 0;

    for (const word of queryWords) {
      if (
        docLower.includes(word)
      ) {
        matches++;
      }
    }

    return (
      matches /
      queryWords.length
    );
  };

const rankResults = (
  results,
  query
) => {
  return [...results].sort(
    (a, b) => {
      const semanticA =
        a.score;

      const semanticB =
        b.score;

      const keywordA =
        keywordMatchScore(
          query,
          a.document
        );

      const keywordB =
        keywordMatchScore(
          query,
          b.document
        );

      const finalA =
        semanticA * 0.7 +
        keywordA * 0.3;

      const finalB =
        semanticB * 0.7 +
        keywordB * 0.3;

      return (
        finalB - finalA
      );
    }
  );
};

export const retrieveAssessments =
  async (
    query
  ) => {
    let results =
      await retrieveWithRetry(
        query
      );

    results =
      rankResults(
        results,
        query
      );

    return results.slice(
      0,
      5
    );
  };