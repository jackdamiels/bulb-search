import { readFileSync } from "fs";
import Typesense from "typesense";

const client = new Typesense.Client({
  nodes: [
    {
      host: "localhost",
      port: 8108,
      protocol: "http", // For Typesense Cloud use https
    },
  ],
  apiKey: "xyz",
  connectionTimeoutSeconds: 2,
});

const importEntries = async () => {
  const entries = readFileSync("scripts/entries.json", "utf8");
  // const result = await client.collections("entries").documents().import(entries);
  const json = JSON.parse(entries) as any[];
  json.forEach((entry) => {
    console.log(entry);
    client
      .collections("entries")
      .documents()
      .create({
        ...entry,
        description: `${entry.description}`,
        id: `${entry.id}`,
      });
  });
};

const initializeSchema = async () => {
  const result = await client.collections().create({
    name: "entries",
    // default_sorting_field: "ratings_count",
    fields: [
      { name: "title", type: "string" },
      { name: "uri", type: "string" },
      { name: "slug", type: "string" },
      { name: "url", type: "string" },
      { name: "description", type: "string" },
      // { name: "authors", type: "string[]", facet: true },
      // { name: "publication_year", type: "int32", facet: true },
      // { name: "ratings_count", type: "int32" },
      // { name: "average_rating", type: "float" },
    ],
  });

  console.log(result);
};

const testSearch = () => {
  const searchParameters = {
    q: "How to setup my intenet connection",
    query_by: "description",
    // facet_by: "authors",
    // sort_by: "average_rating:desc",
  };

  client
    .collections("entries")
    .documents()
    .search(searchParameters)
    .then(function (searchResults) {
      console.log(JSON.stringify(searchResults, null, 2));
    });
};

// initializeSchema();
// importEntries();
testSearch();

export default initializeSchema;
