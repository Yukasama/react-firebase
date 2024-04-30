import { StockCard } from "../../components/stocks/Card";
import { Stock } from "../../models/Stock/Stock";
import { useData } from "../../contexts/DataContext";
import { useEffect, useState } from "react";
import Loading from "../../constants/Loading";

export default () => {
  const { get } = useData();

  const [s, setStock] = useState<Stock>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get("GOOG").then((data: Stock) => {
      data && setStock(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-6 m-4">
          <div className="flex flex-col mx-3">
            <p className="mt-3 text-[18px] font-medium">Most Active</p>
            <div className="flex py-3 justify-center gap-6 border-y border-sun-300 dark:border-moon-200">
              <StockCard size="md" />
              <StockCard stock={s} size="md" />
              <StockCard stock={s} size="md" />
              <StockCard stock={s} size="md" />
              <StockCard stock={s} size="md" />
            </div>
          </div>
          <div className="flex flex-col mx-3">
            <p className="mt-3 text-[18px] font-medium">Daily Winners</p>
            <div className="flex py-3 gap-5 border-y border-sun-300 dark:border-moon-200">
              <StockCard stock={s} size="md" />
              <StockCard stock={s} size="md" />
              <StockCard stock={s} size="md" />
              <StockCard stock={s} size="md" />
              <StockCard stock={s} size="md" />
            </div>
          </div>
          <div className="flex flex-col mx-3">
            <p className="mt-3 text-[18px] font-medium">Most Active</p>
            <div className="flex py-3 gap-5 border-y border-sun-300 dark:border-moon-200">
              <StockCard stock={s} size="md" />
              <StockCard stock={s} size="md" />
              <StockCard stock={s} size="md" />
              <StockCard stock={s} size="md" />
              <StockCard stock={s} size="md" />
            </div>
          </div>
          <div className="flex flex-col mx-3">
            <p className="mt-3 text-[18px] font-medium">Most Active</p>
            <div className="flex py-3 gap-5 border-y border-sun-300 dark:border-moon-200">
              <StockCard stock={s} size="md" />
              <StockCard stock={s} size="md" />
              <StockCard stock={s} size="md" />
              <StockCard stock={s} size="md" />
              <StockCard stock={s} size="md" />
            </div>
          </div>
          <div className="relative">
            <div className="relative h-56 overflow-hidden rounded-lg sm:h-64 xl:h-80 2xl:h-96">
              <div
                id="carousel-item-1"
                className="hidden duration-700 ease-in-out">
                <span className="absolute text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 sm:text-3xl dark:text-gray-800">
                  First Slide
                </span>
                <img
                  src="../../../search.png"
                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  alt="..."
                />
              </div>
              <div
                id="carousel-item-2"
                className="hidden duration-700 ease-in-out">
                <img
                  src="../../../apple.png"
                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  alt="..."
                />
              </div>
              <div
                id="carousel-item-3"
                className="hidden duration-700 ease-in-out">
                <img
                  src="../../../facebook.png"
                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  alt="..."
                />
              </div>
              <div
                id="carousel-item-4"
                className="hidden duration-700 ease-in-out">
                <img
                  src="../../../twitter.png"
                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  alt="..."
                />
              </div>
            </div>
            <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
              <button
                id="carousel-indicator-1"
                type="button"
                className="w-3 h-3 rounded-full"
                aria-current="true"
                aria-label="Slide 1"></button>
              <button
                id="carousel-indicator-2"
                type="button"
                className="w-3 h-3 rounded-full"
                aria-current="false"
                aria-label="Slide 2"></button>
              <button
                id="carousel-indicator-3"
                type="button"
                className="w-3 h-3 rounded-full"
                aria-current="false"
                aria-label="Slide 3"></button>
              <button
                id="carousel-indicator-4"
                type="button"
                className="w-3 h-3 rounded-full"
                aria-current="false"
                aria-label="Slide 4"></button>
            </div>
            <button
              id="data-carousel-prev"
              type="button"
              className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg
                  className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"></path>
                </svg>
                <span className="hidden">Previous</span>
              </span>
            </button>
            <button
              id="data-carousel-next"
              type="button"
              className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg
                  className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"></path>
                </svg>
                <span className="hidden">Next</span>
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
