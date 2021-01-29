import { useState, useEffect } from "react";
import snarkdown from "snarkdown";
import { format } from "date-fns";

function JournalEntryCard({ title, body }) {
  const bodyAsHtml = snarkdown(body);
  return (
    <>
      {/* info-card */}
      <div className="journal-entry-card light:bg-white shadow rounded-md px-4 py-3 mb-6">
        <h3 className="text-xs uppercase tracking-wider font-bold text-gray-900 dark:text-gray-400">
          {title}
        </h3>
        {/* journal info goes here */}
        <div
          className="journal-entry-content break-words"
          dangerouslySetInnerHTML={{ __html: bodyAsHtml }}
        ></div>
      </div>
    </>
  );
}

export default function JournalEntry({ visible, model, ...props }) {
  const journalEntryClasses = `journal-entry flex flex-col sm:flex-row relative w-full pb-8 ${
    visible ? "is-visible" : ""
  }`.trim();

  const dateString = format(
    new Date(`${model.date}T00:00:00.000-05:00`),
    "LLLL do"
  );

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
        {model.entries.map((entry, i) => (
          <JournalEntryCard key={i} title={entry.title} body={entry.body} />
        ))}
      </div>
    </li>
  );
}
