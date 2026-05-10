export const safeJsonParse =
  (text) => {
    try {
      return JSON.parse(text);
    } catch (error) {
      return null;
    }
  };