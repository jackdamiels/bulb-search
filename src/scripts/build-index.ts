import { Embeddings } from "../libs/textai";

const myArgs = process.argv.slice(2);

const embeddings = new Embeddings("http://localhost:8000");

const test = () => {
  embeddings.similarity("hello", ["nestoo", "drugo"]).then((result) => {
    console.log("Rezultat", result);
  });
};

const importEntries = async () => {
  // const entries = readFileSync("scripts/entries.json", "utf8");
  // // const result = await client.collections("entries").documents().import(entries);
  // const json = JSON.parse(entries) as any[];
  // json.forEach((entry) => {
  //   console.log(entry);
  // });
};

test();

export default importEntries;
