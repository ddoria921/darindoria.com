import SwiperCore, { Navigation, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import snarkdown from "snarkdown";
import { format } from "date-fns";

// install Swiper components
SwiperCore.use([A11y]);

const buttonClasses = "";

function JournalEntryCard({ title, body }) {
  const bodyAsHtml = snarkdown(body);
  return (
    <>
      {/* info-card */}
      <div className="journal-entry-card light:bg-white shadow rounded-md px-4 py-3">
        <h3 className="text-xs uppercase tracking-wider font-bold text-gray-900 dark:text-gray-400">
          {title}
        </h3>
        {/* journal info goes here */}
        <div
          className="journal-entry-content"
          dangerouslySetInnerHTML={{ __html: bodyAsHtml }}
        ></div>
      </div>
    </>
  );
}

function NextButton({ hidden, swiper, className, ...props }) {
  const btnClasses = `bg-gray-200 rounded-lg w-20 h-10 sm:rounded-full sm:flex-none sm:self-center sm:w-6 sm:h-6 dark:bg-indigo-800 ${
    hidden ? "opacity-25 cursor-not-allowed" : "opacity-100"
  } ${className}`.trim();
  return (
    <button
      aria-label="next journal entry"
      disabled={hidden}
      onClick={() => swiper && swiper.slideNext()}
      className={btnClasses}
      {...props}
    >
      <svg
        className="text-gray-500 m-auto w-10 h-10 sm:w-6 sm:h-6 dark:text-indigo-200"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  );
}

function PreviousButton({ hidden, swiper, className, ...props }) {
  const btnClasses = `bg-gray-200 rounded-lg w-20 h-10 sm:rounded-full sm:flex-none sm:self-center sm:w-6 sm:h-6 dark:bg-indigo-800 ${
    hidden ? "opacity-25 cursor-not-allowed" : "opacity-100"
  } ${className}`.trim();
  return (
    <button
      aria-label="previous journal entry"
      disabled={hidden}
      onClick={() => swiper && swiper.slidePrev()}
      className={btnClasses}
      {...props}
    >
      <svg
        className="text-gray-500 m-auto w-10 h-10 sm:w-6 sm:h-6 dark:text-indigo-200"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  );
}

export default function JournalEntry({ visible, model }) {
  const journalEntryClasses = `journal-entry flex flex-col sm:flex-row relative w-full pb-8 ${
    visible ? "is-visible" : ""
  }`.trim();
  const [swiper, setSwiper] = useState(null);
  const [hideNext, setHideNext] = useState(true);
  const [hidePrev, setHidePrev] = useState(true);
  const dateString = format(new Date(model.date), "LLLL do");

  function handleSlideChange(swiper) {
    setHidePrev(swiper.isBeginning);
    setHideNext(swiper.isEnd);
  }

  function updateSwiper() {
    if (visible && swiper) {
      swiper.update();
    }
  }

  useEffect(() => {
    if (swiper) {
      handleSlideChange(swiper);
    }
  }, [swiper]);
  useEffect(updateSwiper, [swiper]);

  return (
    <li className={journalEntryClasses}>
      {/* date */}
      <p className="journal-entry-date sm:text-right">
        <span className="sm:italic">
          Week of <br className="hidden sm:block" />
        </span>{" "}
        {dateString}
      </p>

      {/* line */}
      <div className="journal-entry-line"></div>

      {/* bullet */}
      <div className="journal-entry-bullet"></div>

      <PreviousButton
        className="hidden sm:block"
        hidden={hidePrev}
        swiper={swiper}
      />

      {/* info-card container */}
      <div className="journal-entry-card-container relative w-full flex-auto sm:max-w-md md:max-w-none">
        <Swiper
          a11y={true}
          autoHeight={true}
          centeredSlides={true}
          onSlideChange={handleSlideChange}
          onSwiper={setSwiper}
          spaceBetween={40}
        >
          {model.entries.map((entry, i) => (
            <SwiperSlide className="p-2" key={i}>
              <JournalEntryCard title={entry.title} body={entry.body} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex justify-around mt-2 sm:mt-0">
        <PreviousButton
          className="block sm:hidden"
          hidden={hidePrev}
          swiper={swiper}
        />
        <NextButton hidden={hideNext} swiper={swiper} />
      </div>
    </li>
  );
}
