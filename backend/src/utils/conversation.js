export const getLastUserMessage =
  (messages) => {
    const reversed =
      [...messages].reverse();

    return reversed.find(
      (msg) =>
        msg.role === "user"
    );
  };

export const needsClarification =
  (message) => {
    const wordCount =
      message.split(" ").length;

    return wordCount < 4;
  };