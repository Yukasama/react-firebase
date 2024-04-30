import { Link } from "react-router-dom";
import { Stock } from "../../models/Stock/Stock";

export const ListItem: React.FC<{ stock: Stock }> = ({ stock }) => {
  const pos = Number(stock.changePercent) > 0 ? true : false;

  return (
    <Link
      to={`/stocks/${stock.symbol}}`}
      className="w-full rounded-sm flex justify-between p-3 pl-2 items-center h-[50px] 
      bg-sun-200 dark:bg-moon-300 hover:bg-sun-400 dark:hover:bg-moon-200">
      <div className="flex items-center gap-3">
        <div className="w-[40px] h-[40px] bg-sun-100 flex-box">
          <img className="w-[30px] h-[30px] " src={stock.imageUrl} />
        </div>
        <p>{stock.name}</p>
      </div>
      <div>
        <p className="text-[12px]">${stock.price}</p>
        <p className={`text-[12px] ${pos ? "text-green-500" : "text-red-500"}`}>
          {pos ? "+" : "-"}
          {stock.changePercent}%
        </p>
      </div>
    </Link>
  );
};
