import fs from "fs/promises";

const check =
  async () => {

    const raw =
      await fs.readFile(
        "./src/data/shl_catalog.json",
        "utf-8"
      );

    const data =
      JSON.parse(raw);

    console.log(
      "Total Assessments:",
      data.length
    );

    console.log(
      "\nFirst 20 Assessments:\n"
    );

    data
      .slice(0, 20)
      .forEach(
        (
          item,
          index
        ) => {
          console.log(
            `${index + 1}. ${item.name}`
          );
        }
      );
};

check();