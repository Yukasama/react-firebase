import { Link } from "react-router-dom";
import { TrendingUp, TrendingDown } from "@mui/icons-material";
import { Stock } from "../../models/Stock/Stock";

interface StockCardProps {
  stock?: Stock;
  size: "md" | "lg";
}

export const StockCard: React.FC<StockCardProps> = (props) => {
  const positive = props.stock && props.stock.changes > 0;

  return (
    <div
      className={`${
        props.size === "md"
          ? "w-[300px] h-[200px] min-w-[150px]"
          : "w-[400px] h-[500px]"
      } rounded-xl overflow-hidden shadow-xl
      hover:scale-[1.03] transition-transform duration-[400ms]`}>
      {!props.stock ? (
        <div className="flex-box h-full">
          <p className="text-sun-800 font-thin text-[20px]">Not Available</p>
        </div>
      ) : (
        <Link
          to={`stocks/${props.stock.symbol}`}
          className={`block ${positive ? "bg-green-500" : "bg-red-500"}`}>
          <div className="h-[50px] lg:h-[75px] bg-sun-100 dark:bg-moon-600 relative flex rounded-br-[100px]">
            <img
              className="scale-50"
              src={props.stock.image}
              alt="Company Logo"></img>
          </div>
          <div className="flex flex-col lg:flex-row gap-1 lg:gap-2 m-2 mx-1.5">
            <div className="bg-sun-100 dark:bg-moon-300 p-1 px-3 rounded-full">
              <p className="text-[9px] lg:text-[12px]">{props.stock.sector}</p>
            </div>
            <div className="bg-sun-100 dark:bg-moon-300 p-1 px-3 rounded-full">
              <p className="text-[9px] lg:text-[12px]">
                {props.stock.industry}
              </p>
            </div>
          </div>
          <p className="text-[12px] lg:text-[20px] ml-3 text-sun-100">
            {props.stock.companyName}
          </p>
          <div className="ml-1 lg:ml-3 flex flex-col lg:flex-row lg:items-center lg:gap-[2px]">
            <div className="flex items-center ml-1.5 lg:ml-0">
              <p className="text-[16px] lg:text-[20px] text-sun-100">
                {props.stock.price}
              </p>
              <p className="text-[11px] lg:text-[14px] text-sun-300">USD</p>
            </div>
            <div className="flex bg-sun-100 dark:bg-moon-300 m-1 mt-2 p-[2px] pl-3 pr-4 rounded-full items-center gap-1">
              {positive ? (
                <TrendingUp className="text-green-500 text-[22px]" />
              ) : (
                <TrendingDown className="text-red-500 text-[22px]" />
              )}
              <p
                className={`text-moon-100 dark:text-sun-400 text-[16px] ml-1 font-medium`}>
                {positive ? "+" : "-"}
                {props.stock.changes} %
              </p>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};
