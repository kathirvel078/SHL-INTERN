export const buildComparisonContext =
  (
    assessmentA,
    assessmentB
  ) => {
    return `
Assessment A

Name:
${assessmentA.metadata.name}

Content:
${assessmentA.document}

--------------------------------

Assessment B

Name:
${assessmentB.metadata.name}

Content:
${assessmentB.document}
`;
  };