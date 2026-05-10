export const detectIntent =
  (message) => {
    const lower =
      message.toLowerCase();

    if (
      lower.includes("compare") ||
      lower.includes("difference")
    ) {
      return "comparison";
    }

    if (
      lower.includes(
        "ignore previous"
      ) ||
      lower.includes("hack")
    ) {
      return "refusal";
    }

    if (
      lower.includes(
        "recommend"
      ) ||
      lower.includes("assessment") ||
      lower.includes("test")
    ) {
      return "recommendation";
    }

    return "clarification";
  };