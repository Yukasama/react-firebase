import {
  LogoutOutlined,
  LoginOutlined,
  LanguageOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Logout from "../auth/Logout";
import { Searchbar } from "../forms/Input";
import { ThemeToggler } from "../themes/ThemeToggler";

export default () => {
  const { user } = useAuth();

  const [collapsed, setCollapsed] = useState(false);
  const [logoutShow, setLogoutShow] = useState(false);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  function handleClick(e: any) {
    if (
      !e.target.closest("#login-window") &&
      !e.target.closest("#login-button") &&
      !e.target.closest(".theme-toggle") &&
      !e.target.closest("#sidebar-toggle")
    ) {
      setCollapsed(false);
    }
  }

  return (
    <div
      className={`z-10 flex sticky h-[58px] top-0 w-full justify-between p-2 px-5 shadow-sm dark:shadow-moon-100`}>
      <div className="w-[100px]">
        <Link to="/" className="hidden lg:flex w-10 self-end cursor-pointer">
          <img
            className="rounded-md"
            src="../../../logo.png"
            alt="Spectre Logo"
          />
        </Link>
      </div>

      <Searchbar />

      <div className="flex w-[100px] items-center">
        <ThemeToggler />
        <div
          id="login-button"
          className="rounded-md p-[6px]
          dark:border-moon-300 hover:bg-sun-300 dark:hover:bg-moon-100 cursor-pointer 
          flex items-center justify-center h-[40px] w-[40px] m-2"
          onClick={() =>
            setCollapsed((prev) =>
              prev === collapsed ? !collapsed : collapsed
            )
          }>
          <img
            className="rounded-full"
            referrerPolicy="no-referrer"
            src={user?.photoURL || "../../../logo.png"}
            alt="User Logo"
          />
        </div>
      </div>

      <div
        id="login-window"
        className={`${
          !collapsed && "hidden"
        } flex flex-col justify-between items-center gap-3 fixed h-[350px] w-[250px] 
        right-5 p-3 top-[65px] rounded-lg shadow-md bg-sun-300 dark:bg-moon-400`}>
        <div className="flex flex-col items-center gap-4 w-full">
          <div
            className="flex items-center w-full h-[60px] rounded-md
           bg-sun-400 dark:bg-moon-500">
            <img
              className="m-4 h-[45px] w-[45px] rounded-md"
              referrerPolicy="no-referrer"
              src={user?.photoURL || "../../../logo.png"}
              alt="User Logo"
            />
            <div className="flex flex-col">
              <p className="font-medium">
                {user
                  ? user?.displayName ||
                    user.email?.split("@")[0].charAt(0).toUpperCase() +
                      user.email?.split("@")[0].slice(1).toLowerCase()
                  : "Guest"}
              </p>
              <Link to="/account/profile" className="text-blue-500 text-[14px]">
                Manage Account
              </Link>
            </div>
          </div>
          {!user ? (
            <div className="w-full flex flex-col items-center cursor-pointer">
              <Link
                to="/account/login"
                className="flex items-center h-[50px] w-full rounded-md bg-gradient-to-br
                          from-blue-400 to-purple-600">
                <LoginOutlined className="m-4 text-sun-100" />
                <p className="text-sun-100">Sign In</p>
              </Link>
              <div className="flex items-center gap-2 my-0.5">
                <div className="h-[1px] w-[50px] bg-sun-700 bg-opacity-30"></div>
                <p className="text-sun-700 dark:text-sun-800 opacity-60 text-[13px]">
                  OR
                </p>
                <div className="h-[1px] w-[50px] bg-sun-700 bg-opacity-30"></div>
              </div>
              <Link
                to="/account/register"
                className="flex items-center w-full h-[50px] rounded-md bg-gradient-to-br 
                          from-sun-400 to-sun-500 dark:from-moon-100 dark:to-moon-200">
                <LoginOutlined className="m-4" />
                <p>Register</p>
              </Link>
            </div>
          ) : (
            <div className="w-full gap-3 flex flex-col">
              <button
                onClick={() => setLogoutShow(true)}
                className="flex items-center cursor-pointer h-[50px] rounded-md bg-gradient-to-br
                  from-sun-400 to-sun-500 dark:from-moon-100 dark:to-moon-200">
                <LogoutOutlined className="m-4" />
                <p className="">Sign Out</p>
              </button>
            </div>
          )}
        </div>
        <div
          className="flex items-center cursor-pointer mb-1 h-[50px] w-full rounded-md 
        bg-sun-300 dark:bg-moon-500 hover:bg-sun-400 hover:dark:bg-moon-300">
          <LanguageOutlined className="m-4" />
          <p>Language</p>
        </div>
      </div>
      <div
        className={`${
          logoutShow ? "flex z-10 left-[calc(50%)]" : "hidden"
        } absolute`}>
        <Logout setShow={setLogoutShow} />
      </div>
    </div>
  );
};
