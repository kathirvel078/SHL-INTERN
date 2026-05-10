export const buildChunk =
  (assessment) => {
    return `
Assessment Name:
${assessment.name}

Description:
${assessment.description}

Skills:
${assessment.skills?.join(", ")}

Categories:
${assessment.categories?.join(", ")}

Test Type:
${assessment.test_type}
`;
  };