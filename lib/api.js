import { Client } from "@notionhq/client";

const WORK_JOURNAL_DB_ID = process.env.NOTION_WORK_JOURNAL_DB_ID;

const notion = new Client({
  auth: process.env.NOTION_JOURNAL_API_KEY,
});

//-- Notion API Calls --//

async function queryNotionJournalEntries(options) {
  const queryOptions = {
    database_id: WORK_JOURNAL_DB_ID,
    ...options,
  };

  let page;

  try {
    page = await notion.databases.query(queryOptions);
  } catch (err) {
    if (err.code === "unauthorized") {
      return [];
    }

    console.error(
      `Failed to query Notion database ${queryOptions.database_id}`
    );
  }

  return page.results;
}

async function getPageBlocks(pageId) {
  let pageBlocks;

  try {
    pageBlocks = await notion.blocks.children.list({ block_id: pageId });
  } catch (err) {
    console.error(`Failed to get page blocks ${pageId}`, err);
  }
  return pageBlocks.results;
}

function splitByType(blocks, splitType, { keep = true } = {}) {
  return blocks.reduce((previous, current) => {
    if (current.type === splitType || previous.length === 0) {
      const newGroup = keep ? { blocks: [current] } : { blocks: [] };
      previous.push(newGroup);
    } else {
      const lastGroup = previous.pop();
      lastGroup.blocks.push(current);
      previous.push(lastGroup);
    }

    return previous;
  }, []);
}

export async function getPublishedJournalEntries() {
  const pageObjects = await queryNotionJournalEntries({
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Created At",
        direction: "descending",
      },
    ],
  });

  const allPageBlocks = await Promise.all(
    pageObjects.map((page) => getPageBlocks(page.id))
  );

  return pageObjects.map((page, index) => {
    const currentPageBlocks = allPageBlocks[index];
    const groups = splitByType(currentPageBlocks, "heading_2");
    return {
      id: page.id,
      createdAt: page.properties["Created At"]?.date.start || page.created_time,
      groups,
    };
  });
}
