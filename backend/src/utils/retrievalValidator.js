export const hasStrongResults =
  (
    results,
    threshold = 0.6
  ) => {
    if (
      results.length === 0
    ) {
      return false;
    }

    return results.some(
      (result) =>
        result.confidence >=
        threshold
    );
  };

  if (
  !hasStrongResults(
    results
  )
) {
  return {
    reply:
      "No sufficiently relevant SHL assessments were found.",

    recommendations: [],

    end_of_conversation: true,
  };
}