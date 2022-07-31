import { Embeddings } from "../libs/textai";
import { getIndexableEntries } from "./import-from-craft";

const RAW_ENTRIES_PATH = "./src/scripts/entries.json";
const embeddings = new Embeddings("http://localhost:8000");

export const buildEmbedingIndex = async () => {
  console.log("Preparing indexable entrie...");
  const indexableEntries = getIndexableEntries(RAW_ENTRIES_PATH);
  console.log("Building embeding index from entries...");
  await embeddings.add(indexableEntries);
  await embeddings.index();
};

if (require.main === module) {
  if (process.argv.length < 3) {
    console.error("Missing arg, please provide action name");
  }

  const action = process.argv[2];
  if (action === "build-index") {
    console.log("ajmooo");
    buildEmbedingIndex();
  }
} else {
  console.log("required as a module");
}
