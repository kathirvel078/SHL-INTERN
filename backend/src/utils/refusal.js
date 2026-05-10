export const buildRefusalResponse =
  (
    reason =
      "unsafe"
  ) => {
    const replies = {
      unsafe:
        "I can only assist with SHL assessment recommendations and safe hiring-related queries.",

      off_topic:
        "This assistant only supports SHL assessment recommendation workflows.",

      injection:
        "Your request violates system safety policies.",
    };

    return {
      reply:
        replies[reason] ||
        replies.unsafe,

      recommendations: [],

      end_of_conversation: true,
    };
  };