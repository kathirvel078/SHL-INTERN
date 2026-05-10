export const buildContext =
  (results) => {
    return results
      .map(
        (
          result,
          index
        ) => `
Assessment ${index + 1}

Name:
${result.metadata.name}

Content:
${result.document}
`
      )
      .join("\n\n");
  };