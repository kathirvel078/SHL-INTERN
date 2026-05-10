


export const keywordOverlapScore =
  (
    query,
    text
  ) => {
    const queryWords =
      query
        .toLowerCase()
        .split(/\s+/);

    const textWords =
      text
        .toLowerCase()
        .split(/\s+/);

    const matches =
      queryWords.filter(
        (word) =>
          textWords.includes(
            word
          )
      );

    return (
      matches.length /
      queryWords.length
    );
  };

  export const calculateConfidence =
  (
    semanticScore,
    keywordScore
  ) => {
    return (
      semanticScore * 0.7 +
      keywordScore * 0.3
    );
  };

  export const scoreResults =
  (
    results,
    query
  ) => {
    return results.map(
      (result) => {
        const keywordScore =
          keywordOverlapScore(
            query,
            result.document
          );

        const confidence =
          calculateConfidence(
            result.score,
            keywordScore
          );

        return {
          ...result,

          keywordScore,

          confidence,
        };
      }
    );
  };



  export const filterWeakResults =
  (results) => {
    return results.filter(
      (result) =>
        result.confidence >
        0.3
    );
  };


  export const deduplicateResults =
  (results) => {
    const seen =
      new Set();

    return results.filter(
      (result) => {
        const name =
          result.metadata.name;

        if (
          seen.has(name)
        ) {
          return false;
        }

        seen.add(name);

        return true;
      }
    );
  };


  export const sortResultsByConfidence =
  (results) => {
    return results.sort(
      (a, b) =>
        b.confidence -
        a.confidence
    );
  };