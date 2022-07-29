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
  fields: { [key: string]: string };
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
  content: string;
  slug: string;
  url: string;
}

const processEntries = (entries: FaqEntry[]): IndexableEntry[] => {
  const indexableEntries: IndexableEntry[] = [];
  for (const entry of entries) {
    if (isSupportedEntryType(entry.typeId)) {
      const { title, description, slug, url, shortFaq } = entry;
      let content = `${title}\n${description}`;

      for (const key in shortFaq) {
        const sfEntry = shortFaq[key];
        if (sfEntry) {
          const { fields } = sfEntry;
          const { question, answer } = fields;
          const sfContent = `${question}\n${answer}`;
          content += `\n${sfContent}`;
        }
      }

      indexableEntries.push({ content, slug, url });
    }
  }

  return indexableEntries;
};

export const getIndexableEntries = (entriesPath: string) => {
  const entries = readFile(entriesPath);
  return processEntries(entries);
};
