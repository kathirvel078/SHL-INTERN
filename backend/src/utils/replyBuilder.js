export const buildRecommendationReply =
  (
    query,
    count
  ) => {
    return `Found ${count} relevant SHL assessments for: ${query}`;
  };