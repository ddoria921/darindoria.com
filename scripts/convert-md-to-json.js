const fs = require("fs");
const { join } = require("path");

const journalEntriesDir = join(process.cwd(), "_journal-entries");

/**
 * Fetches all journal entry objects synchronously
 *
 * @return {JournalEntry[]}
 */
function getJournalEntriesMarkdown() {
  const journalEntrySlugs = fs.readdirSync(journalEntriesDir);

  const journalEntriesAsMarkdown = journalEntrySlugs
    .filter((slug) => slug.includes(".md"))
    .map(getJournalEntryBySlug);

  return journalEntriesAsMarkdown;
}

/**
 * Fetches a single journal entry by slug
 *
 * @param {String} slug the date used to identify the journal entry
 * @return {JournalEntry}
 */
function getJournalEntryBySlug(slug) {
  const fullPath = join(journalEntriesDir, slug);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  return { date: slug.replace(/\.md$/, ""), markdown: fileContents };
}

/**
 * Takes in a markdown and date then returns it formatted
 * as a journal entry object to be consumed by the client
 *
 * @param {String} obj.date the date of the entry
 * @param {String} obj.markdown the markdown content as originally written
 */
function markdownToJournalEntry({ date, markdown }) {
  // 1. split on "##"
  let contentBlocks = markdown.split("##");

  // 2. remove empty strings
  contentBlocks = contentBlocks.filter((content) => content.trim() !== "");

  // 3. convert each block into an object
  const journalEntryBlocks = contentBlocks.map((content) => {
    const [title, ...body] = content.split("\n");

    console.log({ title, body });

    return {
      title: title.trim(),
      body: body.join("\n"),
    };
  });

  // 4. return journal entry object
  return {
    date,
    entries: journalEntryBlocks,
  };
}

const journalEntries = getJournalEntriesMarkdown().map(markdownToJournalEntry);

journalEntries.forEach((entry) => {
  // write each entry to a new json file
  const outputDir = join(process.cwd(), "out");
  const outputFile = join(outputDir, `${entry.date}.json`);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  fs.writeFileSync(outputFile, JSON.stringify(entry));
});
