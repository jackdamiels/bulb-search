import { readFileSync } from "fs";

/**
 *
 * Relevant types:
 * "typeId": 3
 * "typeId": 12,
 *
 */

// Read file from path on local filesystem
const readFile = (path: string) => {
  const f = readFileSync(path);
  return JSON.parse(f.toString());
};

const isSupportedEntryType = (typeId: number) => {
  return [3, 12].includes(typeId);
};

interface FaqSubentry {
  type: "shortFaq";
  fields: { question: string; answer: string };
}

interface FaqEntry {
  title: string;
  description: string;
  typeId: number;
  slug: string;
  url: string;
  shortFaq: { [key: number]: FaqSubentry };
}

export interface IndexableEntry {
  id: string;
  text: string;
  slug: string;
  url: string;
  title: string;
  description: string;
}

const processEntries = (entries: FaqEntry[]): IndexableEntry[] => {
  const indexableEntries: IndexableEntry[] = [];
  for (const entry of entries) {
    if (isSupportedEntryType(entry.typeId)) {
      const { title, description, slug, url, shortFaq } = entry;

      for (const key in shortFaq) {
        const sfEntry = shortFaq[key];
        if (sfEntry) {
          const { fields } = sfEntry;
          let text = `${title}\n${description}`;
          const { question, answer } = fields;
          const sfContent = `${question}\n${answer}`;
          indexableEntries.push({
            id: slug,
            text: sfContent,
            slug,
            url,
            title,
            description,
          });
        }
      }
    }
  }

  return indexableEntries;
};

export const getIndexableEntries = (entriesPath: string) => {
  const entries = readFile(entriesPath);
  return processEntries(entries);
};
