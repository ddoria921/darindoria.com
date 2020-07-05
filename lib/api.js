import fs from "fs";
import { join } from "path";

const journalEntriesDir = join(process.cwd(), "_journal-entries");

/**
 * Fetches all journal entry objects synchronously
 *
 * @return {JournalEntry[]}
 */
export function getAllJournalEntries() {
  const journalEntrySlugs = fs.readdirSync(journalEntriesDir);

  const journalEntries = journalEntrySlugs
    .map(getJournalEntryBySlug)
    .sort((entry1, entry2) => (entry1.date > entry2.date ? -1 : 1));

  console.log({ journalEntries });
  return journalEntries;
}

export function getJournalEntryBySlug(slug) {
  const fullPath = join(journalEntriesDir, slug);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  return JSON.parse(fileContents);
}