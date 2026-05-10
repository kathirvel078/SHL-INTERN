export const extractComparisonItems =
  (message) => {
    const cleaned =
      message
        .replace(
          /compare/gi,
          ""
        )
        .replace(
          /difference between/gi,
          ""
        )
        .trim();

    const separators = [
      " and ",
      " vs ",
      " versus ",
    ];

    for (const separator of separators) {
      if (
        cleaned.includes(
          separator
        )
      ) {
        return cleaned
          .split(separator)
          .map((item) =>
            item.trim()
          );
      }
    }

    return [];
  };