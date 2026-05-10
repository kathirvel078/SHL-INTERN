
  export const formatRecommendations =
  (results) => {
    return results.map(
      (result) => ({
        name:
          result.metadata?.name ||
          "Unknown Assessment",

        url:
          result.metadata?.url ||
          "",

        test_type:
          result.metadata
            ?.test_type ||
          "Unknown",
      })
    );
  };