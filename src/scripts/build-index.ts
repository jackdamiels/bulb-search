import { Embeddings } from "../libs/textai";
import { getIndexableEntries } from "./import-from-craft";

const RAW_ENTRIES_PATH = "./src/scripts/entries.json";
const embeddings = new Embeddings("http://localhost:8000");

const buildEmbedingIndex = async () => {
  console.log("Preparing indexable entrie...");
  const indexableEntries = getIndexableEntries(RAW_ENTRIES_PATH);
  console.log("Building embeding index from entries...");
  await embeddings.add(indexableEntries);
  await embeddings.index();
};

const search = (query: string) => {
  return embeddings.search(query, 2);
};

const entryPoint = async () => {
  const question = "How do I improve my WIFI signal";
  const answers = await search(question);

  for (const answer of answers) {
    console.log("And the answer is: ", answer.id, "with score: ", answer.score);
  }
};

entryPoint();
