import Head from "next/head";
import VisibilitySensor from "react-visibility-sensor";

import { getAllJournalEntries } from "../lib/api";
import JournalEntry from "../components/JournalEntry";
import { useEffect, useState } from "react";

export default function WorkJournal({ journalEntries }) {
  const [delay, setDelay] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelay(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Work Journal - Darin Doria</title>
        <meta
          name="description"
          content="A weekly record of notable things going on with work and side projects, plus general learnings."
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/swiper/swiper-bundle.min.css"
        />
      </Head>
      <div className="pt-8">
        <h3 className="mt-2 mx-auto text-3xl leading-8 font-extrabold tracking-tight text-gray-900 w-full text-center md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg sm:text-4xl sm:leading-10 dark:text-gray-200">
          Work Journal
        </h3>
        <ul className="relative mx-auto mt-6 pl-12 pr-6 w-full md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg xl:px-40 sm:pl-40">
          {journalEntries.map((entry, i) => (
            <VisibilitySensor
              key={i}
              offset={{ bottom: 80 }}
              partialVisibility={true}
            >
              {({ isVisible }) => (
                <JournalEntry
                  visible={isVisible}
                  model={entry}
                  style={{
                    "--transition-delay": delay ? (i + 1) * 125 + "ms" : null,
                  }}
                />
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
