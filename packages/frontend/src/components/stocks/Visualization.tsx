import { Stock } from "../../models/Stock/Stock";

export const BarProgress: React.FC<{ stock: Stock }> = ({ stock }) => {
  return (
    <div className="">
      <div className="flex items-center gap-2 hover:bg-sun-300 dark:hover:bg-moon-400 p-2 px-5 group rounded-md animate-appear-up">
        <p className="text-[13px] font-medium w-7">P/E</p>
        <div className="bg-sun-300 dark:bg-moon-100 h-4 w-40 rounded-full group-hover:scale-x-[1.03] group-hover:bg-sun-400 dark:group-hover:bg-moon-200 transition-transform">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-4 w-2/3 rounded-full"></div>
        </div>
      </div>
      <div className="flex items-center gap-2 hover:bg-sun-300 dark:hover:bg-moon-400 p-2 px-5 group rounded-md animate-appear-up">
        <p className="text-[13px] font-medium w-7">EPS</p>
        <div className="bg-sun-300 dark:bg-moon-100 h-4 w-40 rounded-full group-hover:scale-x-[1.03] group-hover:bg-sun-400 dark:group-hover:bg-moon-200 transition-transform">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-4 w-2/3 rounded-full"></div>
        </div>
      </div>
      <div className="flex items-center gap-2 hover:bg-sun-300 dark:hover:bg-moon-400 p-2 px-5 group rounded-md animate-appear-up">
        <p className="text-[13px] font-medium w-7">P/B</p>
        <div className="bg-sun-300 dark:bg-moon-100 h-4 w-40 rounded-full group-hover:scale-x-[1.03] group-hover:bg-sun-400 dark:group-hover:bg-moon-200 transition-transform">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-4 w-2/3 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export const EYE: React.FC<{ stock: Stock }> = ({ stock }) => {
  const value = stock?.eye || 1;
  const dashArray = 2 * Math.PI * 54;
  const dashOffset = (1 - value / 165) * dashArray;

  const score =
    value >= 1 && value < 30
      ? "Low Score"
      : value >= 30 && value < 60
      ? "Medium Score"
      : "Good Score";

  return (
    <div className="relative rounded-full translate-y-5 h-[150px] w-[150px]">
      <svg
        className="absolute top-0 left-0 h-full w-full"
        viewBox="0 0 120 120"
        style={{
          rotate: "160deg",
        }}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8e17e8" />
            <stop offset="100%" stopColor="#0a74bf" />
          </linearGradient>
        </defs>
        <circle
          className="fill-sun-200 dark:fill-moon-300 animate-appear-down"
          cx="60"
          cy="60"
          r="54"
          strokeWidth={8}
          stroke="url(#gradient)"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="flex-box flex-col relative h-[90%] w-full">
        <p className="font-medium text-[30px] text-center">{value}</p>
        <p className="text-[13px] font-light text-blue-500 text-center">
          {score}
        </p>
      </div>
    </div>
  );
};
