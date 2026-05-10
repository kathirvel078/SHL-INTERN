const expansions = {
  java:
    "Java backend developer",

  react:
    "React frontend developer",

  python:
    "Python backend engineer",
};

export const expandQuery =
  (query) => {
    let expanded =
      query;

    for (const key in expansions) {
      if (
        query
          .toLowerCase()
          .includes(key)
      ) {
        expanded +=
          " " +
          expansions[key];
      }
    }

    return expanded;
  };