import { Embeddings } from "../libs/textai";
import Labels from "../libs/textai/labels";
import { getIndexableEntries } from "./import-from-craft";

const RAW_ENTRIES_PATH = "./src/scripts/entries.json";
const embeddings = new Embeddings("http://localhost:8000");

const entryPoint = () => {
  const indexableEntries = getIndexableEntries(RAW_ENTRIES_PATH);
};

entryPoint();
