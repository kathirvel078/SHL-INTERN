const blockedPatterns = [
  "ignore previous",
  "ignore instructions",
  "system prompt",
  "act as",
  "pretend to be",
  "bypass",
  "jailbreak",
  "developer message",
  "reveal prompt",
];

export const isPromptInjection =
  (message) => {
    const lower =
      message.toLowerCase();

    return blockedPatterns.some(
      (pattern) =>
        lower.includes(pattern)
    );
  };

  const allowedKeywords = [
  "assessment",
  "test",
  "hiring",
  "candidate",
  "developer",
  "personality",
  "skill",
  "evaluation",
  "recruitment",
];

export const isOffTopic =
  (message) => {
    const lower =
      message.toLowerCase();

    return !allowedKeywords.some(
      (keyword) =>
        lower.includes(keyword)
    );
  };


  const unsafePatterns = [
  "legal advice",
  "discriminate",
  "reject women",
  "reject minorities",
  "hack system",
];

export const isUnsafeRequest =
  (message) => {
    const lower =
      message.toLowerCase();

    return unsafePatterns.some(
      (pattern) =>
        lower.includes(pattern)
    );
  };