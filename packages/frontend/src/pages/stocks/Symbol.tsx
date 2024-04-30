import {
  BarChart,
  LineChart,
  PriceChart,
} from "../../components/stocks/Chart/Chart";
import { Link, useParams } from "react-router-dom";
import { BarProgress, EYE } from "../../components/stocks/Visualization";
import { ListItem } from "../../components/stocks/ListItem";
import { NorthOutlined, SouthOutlined } from "@mui/icons-material";
import { Stock } from "../../models/Stock/Stock";
import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import NotFound from "../../constants/NotFound";
import Loading from "../../constants/Loading";

const labels = ["2015", "2016", "2017", "2022"];

const priceDatasets = [
  {
    label: "Price",
    data: [1, 6, 5, 2],
    color: "0, 255, 153",
  },
  {
    label: "Price",
    data: [2, 5, 4, 3],
    color: "0, 153, 255",
    pointRadius: 0,
    pointHitRadius: 0,
    pointBorderWidth: 0,
    pointHoverBorderWidth: 0,
    pointHoverRadius: 0,
    fill: false,
  },
];

const statConfig = [
  {
    label: "P/E Ratio",
    data: [1, 6, 5, 2],
    color: "0, 153, 235",
  },
  {
    label: "EPS",
    data: [4, 2, 4, 3],
    color: "135, 0, 235",
  },
  {
    label: "P/B Ratio",
    data: [6, 7, 2, 1],
    color: "0, 255, 150",
  },
];

const marginConfig = [
  {
    label: "Gross Margin",
    data: [1, 6, 5, 2],
    color: "0, 175, 235",
  },
  {
    label: "Operating Margin",
    data: [4, 2, 4, 3],
    color: "0, 115, 245",
  },
  {
    label: "Profit Margin",
    data: [6, 7, 2, 1],
    color: "0, 65, 235",
  },
];

const dividendConfig = [
  {
    label: "Dividend in $",
    data: [1, 6, 5, 2],
    color: "0, 153, 235",
  },
  {
    label: "Payout Ratio",
    data: [4, 2, 4, 3],
    color: "135, 0, 235",
  },
  {
    label: "Dividend %",
    data: [6, 7, 2, 1],
    color: "0, 255, 150",
  },
];

export default () => {
  const { symbol } = useParams();
  const { get } = useData();

  const [s, setStock] = useState<Stock>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get(symbol).then((data: Stock) => {
      data && setStock(data);
      setLoading(false);
    });
  }, []);

  const positive = s && s.changes > 0 ? true : false;

  return (
    <div className="overflow-x-hidden m-4">
      {!s ? (
        <NotFound />
      ) : (
        <div>
          <div className="flex w-full">
            <div className="w-full">
              <div className="flex items-center gap-10 pb-4 border-b border-moon-100">
                <div className="flex flex-col">
                  <Link
                    to="/"
                    className="flex gap-3 p-2 px-4 items-center hover:bg-sun-300 dark:hover:bg-moon-400 rounded-lg animate-appear-up">
                    <div className="w-[50px] h-[50px] bg-sun-100 rounded-full flex-box">
                      <img className="w-7 h-7" src={s.image} />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-col">
                        <p className="font-medium text-[25px]">
                          {s.companyName}
                        </p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <p
                          className={`text-[19px] ${
                            positive ? "text-green-500" : "text-red-500"
                          }`}>
                          {positive ? "+" : "-"}${s.changes}
                        </p>
                        <p
                          className={`text-[19px] ${
                            positive ? "text-green-500" : "text-red-500"
                          }`}>
                          ({s.changes}%)
                        </p>
                        {positive ? (
                          <NorthOutlined
                            className={`mt-1 text-[18px] ${
                              positive ? "text-green-500" : "text-red-500"
                            }`}
                          />
                        ) : (
                          <SouthOutlined
                            className={`mt-2 text-[18px] ${
                              positive ? "text-green-500" : "text-red-500"
                            }`}
                          />
                        )}
                      </div>
                    </div>
                  </Link>
                  <div></div>
                </div>
                <BarProgress stock={s} />
                <EYE stock={s} />
              </div>
              <div className="flex my-4 gap-4">
                <div className="">
                  <PriceChart
                    labels={labels}
                    data={priceDatasets}
                    loading={loading}
                  />
                </div>
                <div className="min-w-[300px] flex flex-col gap-2 bg-sun-300 dark:bg-moon-400 rounded-lg px-6 p-4 animate-appear-up">
                  <p className="text-[19px] font-medium mb-1">Competitors</p>
                  <ListItem stock={s} />
                  <ListItem stock={s} />
                  <ListItem stock={s} />
                  <ListItem stock={s} />
                  <ListItem stock={s} />
                </div>
                <div className="min-w-[350px] flex flex-col gap-2 bg-sun-300 dark:bg-moon-400 rounded-lg px-6 p-4 animate-appear-up">
                  <p className="text-[19px] font-medium mb-1">Competitors</p>
                  <ListItem stock={s} />
                  <ListItem stock={s} />
                  <ListItem stock={s} />
                  <ListItem stock={s} />
                  <ListItem stock={s} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <LineChart title="Statistics" labels={labels} data={statConfig} />
            <BarChart title="Margins" labels={labels} data={marginConfig} />
            <LineChart title="Dividend" labels={labels} data={dividendConfig} />
          </div>
        </div>
      )}
    </div>
  );
};
