import VisibilitySensor from "react-visibility-sensor";
import JournalEntry from "../components/journal-entry";

export default function WorkJournal() {
  // const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const items = [1, 2];

  return (
    <div className="mt-8">
      <ul className="relative mx-auto pl-12 pr-6 w-full md:max-w-screen-sm lg:max-w-screen-md sm:pl-40">
        {items.map((i) => (
          <VisibilitySensor
            key={i}
            offset={{ bottom: 80 }}
            partialVisibility={true}
          >
            {({ isVisible }) => <JournalEntry visible={isVisible} />}
          </VisibilitySensor>
        ))}
      </ul>
    </div>
  );
}
