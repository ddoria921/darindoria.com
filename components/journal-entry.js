import SwiperCore, { Navigation, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";

// install Swiper components
SwiperCore.use([A11y]);

const buttonClasses = "";

function JournalEntryCard() {
  return (
    <>
      {/* info-card */}
      <div className="bg-white shadow rounded-md px-4 py-3">
        <h3 className="text-xs uppercase tracking-wider font-bold text-gray-900">
          Work
        </h3>
        {/* journal info goes here */}
        <ul className="list-disc pl-6 mt-2 text-gray-900">
          <li>Wrote summary for video 3</li>
          <li>Recorded voiceover for video 3</li>
          <li>Research how to deploy Storybook</li>
          <li>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries,
          </li>
        </ul>
      </div>
    </>
  );
}

function NextButton({ hidden, swiper, className, ...props }) {
  const btnClasses = `bg-gray-200 rounded-lg w-20 h-10 sm:rounded-full sm:flex-none sm:self-center sm:w-6 sm:h-6 ${
    hidden ? "opacity-25 cursor-not-allowed" : "opacity-100"
  } ${className}`.trim();
  return (
    <button
      disabled={hidden}
      onClick={() => swiper && swiper.slideNext()}
      className={btnClasses}
      {...props}
    >
      <svg
        className="text-gray-500 m-auto w-10 h-10 sm:w-6 sm:h-6"
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
  const btnClasses = `bg-gray-200 rounded-lg w-20 h-10 sm:rounded-full sm:flex-none sm:self-center sm:w-6 sm:h-6 ${
    hidden ? "opacity-25 cursor-not-allowed" : "opacity-100"
  } ${className}`.trim();
  return (
    <button
      disabled={hidden}
      onClick={() => swiper && swiper.slidePrev()}
      className={btnClasses}
      {...props}
    >
      <svg
        className="text-gray-500 m-auto w-10 h-10 sm:w-6 sm:h-6"
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

export default function JournalEntry({ visible }) {
  const journalEntryClasses = `journal-entry flex flex-col sm:flex-row relative w-full pb-8 ${
    visible ? "is-visible" : ""
  }`.trim();
  const [swiper, setSwiper] = useState(null);
  const [hideNext, setHideNext] = useState(false);
  const [hidePrev, setHidePrev] = useState(true);

  function handleSlideChange(swiper) {
    console.log({ swiper });
    setHidePrev(swiper.isBeginning);
    setHideNext(swiper.isEnd);
  }

  function updateSwiper() {
    if (visible && swiper) {
      swiper.update();
    }
  }

  useEffect(updateSwiper);

  return (
    <li className={journalEntryClasses}>
      {/* date */}
      <p className="journal-entry-date sm:text-right">
        <span className="italic">
          Week of <br className="hidden sm:block" />
        </span>{" "}
        June 22nd
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
          centeredSlides={true}
          onSlideChange={handleSlideChange}
          onSwiper={setSwiper}
          spaceBetween={18}
        >
          <SwiperSlide className="p-2">
            <JournalEntryCard />
          </SwiperSlide>
          <SwiperSlide className="p-2">
            <JournalEntryCard />
          </SwiperSlide>
          <SwiperSlide className="p-2">
            <JournalEntryCard />
          </SwiperSlide>
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

function useWindowSize() {
  const isClient = typeof window === "object";

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}
