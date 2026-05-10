export const validateRecommendations =
  (
    recommendations,
    retrievedResults
  ) => {
    const validNames =
      retrievedResults.map(
        (result) =>
          result.metadata.name
      );

    return recommendations.filter(
      (
        recommendation
      ) =>
        validNames.includes(
          recommendation.name
        )
    );
  };