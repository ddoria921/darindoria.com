import { format, isSameYear } from "date-fns";
import NotionBlock from "./NotionBlock";

function JournalEntryCard({ blocks }) {
  const headerBlock = blocks[0];

  return (
    <>
      {/* info-card */}
      <div className="journal-entry-card light:bg-white shadow rounded-md px-4 py-3 mb-6">
        <NotionBlock block={headerBlock} />

        <div className="journal-entry-content break-words">
          <ul>
            {blocks
              .filter((block) => block.type === "bulleted_list_item")
              .map((block, i) => (
                <NotionBlock key={i} block={block} />
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default function JournalEntry({ visible, model, ...props }) {
  const journalEntryClasses =
    `journal-entry flex flex-col sm:flex-row relative w-full pb-8 ${
      visible ? "is-visible" : ""
    }`.trim();

  const createdAtDate = new Date(`${model.createdAt}T00:00:00.000-05:00`);
  // if createdAt is previous year, show the year
  const dateFormat = isSameYear(createdAtDate, new Date())
    ? "LLLL do"
    : "LLLL do yyyy";
  const dateString = format(createdAtDate, dateFormat);

  return (
    <li className={journalEntryClasses} {...props}>
      {/* date */}
      <p className="journal-entry-date mb-4 sm:mb-0 sm:text-right">
        <span className="sm:italic">
          Week of <br className="hidden sm:block" />
        </span>{" "}
        {dateString}
      </p>

      {/* line */}
      <div className="journal-entry-line"></div>

      {/* bullet */}
      <div className="journal-entry-bullet"></div>

      {/* info-card container */}
      <div className="journal-entry-card-container relative w-full flex-auto sm:max-w-md md:max-w-none">
        {model.groups.map((entry, i) => (
          <JournalEntryCard
            key={i}
            blocks={entry.blocks}
            title={entry.title}
            body={entry.body}
          />
        ))}
      </div>
    </li>
  );
}
