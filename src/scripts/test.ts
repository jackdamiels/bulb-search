import { Embeddings } from "../libs/textai";

const embeddings = new Embeddings("http://localhost:8000");

const search = async (query: string) => {
  return embeddings.search(query, 2);
};

const entryPoint = async (query: string) => {
  console.log("Searching index for query: ", query);
  const result = await search(query);
  console.log(result)
};

if (require.main === module) {
  if (process.argv.length < 3) {
    console.error("Missing arg, please provide action name");
  }

  const action = process.argv[2];
  const query = process.argv[3];
  console.log("AJMMOOOO", action, query)
  if (action === "search" && query) {
    entryPoint(query);
  }
} else {
  console.log("required as a module");
}
