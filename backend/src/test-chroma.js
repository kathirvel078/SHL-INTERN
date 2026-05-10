import { getCollection }
  from "./services/chroma.service.js";

const test = async () => {
  try {
    const collection =
      await getCollection();

    console.log(
      "Collection created successfully"
    );

    console.log(collection.name);
  } catch (error) {
    console.error(error);
  }
};

test();