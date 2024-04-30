import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LoginOutlined,
  SchoolOutlined,
  BarChartOutlined,
  HomeOutlined,
  SettingsOutlined,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";

export default () => {
  const { user } = useAuth();

  let [collapsed, setCollapsed] = useState(
    localStorage.getItem("collapsed") === "true"
  );
  if (window.innerWidth <= 976) collapsed = true;
  useEffect(() => {
    localStorage.setItem("collapsed", `${collapsed}`);
  }, [collapsed]);

  const [selected, setSelected] = useState("Home");

  const menusUp = [
    {
      title: "Home",
      to: "/",
      icon: <HomeOutlined />,
      selected: { selected },
      gap: false,
    },
    {
      title: "Portfolio",
      to: "/account/portfolio",
      icon: <BarChartOutlined />,
      selected: { selected },
      gap: true,
    },
    {
      title: "Education",
      to: "/education",
      icon: <SchoolOutlined />,
      selected: { selected },
      gap: false,
    },
  ];

  let menusDown = user
    ? [
        {
          title: "Settings",
          to: "/account/settings",
          icon: <SettingsOutlined />,
          selected: { selected },
          gap: false,
        },
      ]
    : [
        {
          title: "Login",
          to: "/account/login",
          icon: <LoginOutlined />,
          selected: { selected },
          gap: false,
        },
      ];

  type ItemProps = {
    title: string;
    to: string;
    icon: JSX.Element;
    gap: boolean;
  };

  const Item: React.FC<ItemProps> = (menu) => {
    return (
      <Link key={menu.title} to={menu.to}>
        <div
          className={`${
            menu.title === selected &&
            "bg-sun-400 dark:bg-moon-200 border-moon-700"
          } rounded-lg hover:bg-sun-400 dark:hover:bg-moon-200 m-1 
              mx-4 flex items-center cursor-pointer`}
          onClick={() => setSelected(menu.title)}>
          <i className="p-3">{menu.icon}</i>
          <p
            className={`${
              collapsed && "hidden"
            } duration-100 transition-transform`}>
            {menu.title}
          </p>
        </div>
        <div
          className={`${
            menu.gap && "h-[0.5px] m-3 mt-4 mx-5"
          } bg-sun-700 dark:bg-moon-100`}></div>
      </Link>
    );
  };

  return (
    <div
      className={`${!collapsed ? "w-[300px]" : "w-20"} flex flex-col
       justify-between bg-sun-300 dark:bg-moon-400`}
      style={{ transition: "width 0.2s" }}>
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex lg:hidden w-12 m-4 self-end cursor-pointer">
          <img
            className="rounded-md"
            src="../../../logo.png"
            alt="Spectre Logo"
          />
        </Link>
        <div
          id="sidebar-toggle"
          className="hidden lg:flex w-12 m-4 mb-2 p-3 self-end bg-sun-500 dark:bg-moon-700 
        hover:bg-sun-600 dark:hover:bg-moon-100 cursor-pointer rounded-md"
          onClick={() =>
            setCollapsed((prev) =>
              prev === collapsed ? !collapsed : collapsed
            )
          }>
          <KeyboardDoubleArrowRight
            className={`text ${
              !collapsed && "rotate-180"
            } transition-transform duration-200`}
          />
        </div>

        <div className="flex flex-col">
          {menusUp.map((menu, i) => (
            <Item key={i} {...menu} />
          ))}
        </div>
      </div>

      <div className="flex flex-col mb-4">
        {menusDown.map((menu, i) => (
          <Item key={i} {...menu} />
        ))}
      </div>
    </div>
  );
};
