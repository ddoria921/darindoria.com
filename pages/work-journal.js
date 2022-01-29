import Head from "next/head";
import VisibilitySensor from "react-visibility-sensor";

import { getPublishedJournalEntries } from "../lib/api";
import Header from "../components/Header";
import JournalEntry from "../components/JournalEntry";

export default function WorkJournal({ notionJournalEntries }) {
  return (
    <>
      <Head>
        <title>Work Journal - Darin Doria</title>
        <meta
          name="description"
          content="A weekly record of notable things going on with work and side projects. Plus some general learnings."
        />
      </Head>

      <div className="min-h-screen">
        <Header />
        <div className="pt-8">
          <h3 className="mt-2 mx-auto text-3xl leading-8 font-extrabold tracking-tight text-gray-900 w-full text-center md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg sm:text-4xl sm:leading-10 dark:text-gray-200">
            Work Journal
          </h3>

          <ul className="relative mx-auto mt-6 pl-12 w-full sm:pl-40 md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg xl:pl-56 xl:pr-24">
            {notionJournalEntries.map((entry, i) => (
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
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const notionJournalEntries = await getPublishedJournalEntries();

  return {
    props: {
      notionJournalEntries,
    },
  };
}
