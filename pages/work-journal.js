import Head from "next/head";
import VisibilitySensor from "react-visibility-sensor";

import { getAllJournalEntries } from "../lib/api";
import JournalEntry from "../components/journal-entry";

export default function WorkJournal({ journalEntries }) {
  return (
    <>
      <Head>
        <title>Darin Doria - Work Journal</title>
        <meta
          name="description"
          content="A weekly record of notable things going on at work, with side projects or general learnings."
        />
      </Head>
      <div className="mt-8">
        <ul className="relative mx-auto pl-12 pr-6 w-full md:max-w-screen-sm lg:max-w-screen-md sm:pl-40">
          {journalEntries.map((entry, i) => (
            <VisibilitySensor
              key={i}
              offset={{ bottom: 80 }}
              partialVisibility={true}
            >
              {({ isVisible }) => (
                <JournalEntry visible={isVisible} model={entry} />
              )}
            </VisibilitySensor>
          ))}
        </ul>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  return {
    props: {
      journalEntries: getAllJournalEntries(),
    },
  };
}
