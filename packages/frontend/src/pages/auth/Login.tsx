import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { EmailInput, PasswordInput } from "../../components/forms/Input";
import { Button } from "../../components/forms/Button";
import { Checkbox } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { OAuth } from "../../components/auth/OAuth";
import { useNotify } from "../../contexts/NotifyContext";

export default () => {
  const { signIn, user } = useAuth();
  const { showPopup } = useNotify();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError("");
  }, [email, pwd]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!email) return showPopup("Invalid Email.");
    else if (!pwd) return showPopup("Invalid Password.");

    setError("");
    await signIn(email, pwd);
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className="flex flex-col gap-4 p-9 pr-[50px] relative w-[450px] rounded-xl m-[100px] 
        bg-sun-300 dark:bg-moon-400 bg-opacity-90 dark:bg-opacity-90 shadow-md">
        {user ? (
          <div>
            <p className="text-blue-600 text-2xl font-medium">
              Youre logged in
            </p>
            <Link to="/" className="text-sun-800 text-[14px]">
              Click here to to stuff
            </Link>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            autoComplete="new-password"
            className="flex flex-col gap-6">
            <div>
              <div className="h-8 w-0.5 bg-blue-600 absolute left-0"></div>
              <p className="text-blue-500 text-2xl font-medium">
                Login In To Your Account
              </p>
              <p className="text-sun-800 text-[14px]">
                Please enter your login details to sign in
              </p>
            </div>
            <div
              className={`bg-red-500 bg-opacity-20 border border-red-500 border-opacity-60 p-3 py-2 mt-[-10px] mb-[-5px] rounded-lg ${
                error === "" && "hidden"
              }`}
              aria-live="assertive">
              <p className="text-red-500 text-[14px]">{error}</p>
            </div>

            <EmailInput id="email" focus={true} onChange={setEmail} />
            <PasswordInput id="pwd" onChange={setPwd} />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Checkbox
                  defaultChecked
                  className="text-blue-600 rounded-md p-1 hover:bg-blue-500 hover:bg-opacity-10"
                />
                <span className="text-sm text-sun-800">Keep me logged in</span>
              </div>
              <Link
                className="text-sm p-2 rounded-md hover:bg-sun-400 dark:hover:bg-moon-200 font-medium text-blue-500"
                to="/account/forgot-password">
                Forgot Password?
              </Link>
            </div>

            <Button disabled={loading} name="Sign In" />
            <div className="flex-box gap-3">
              <div className="h-[1px] flex-1 bg-sun-500 dark:bg-moon-100"></div>
              <p className="text-sun-500 dark:text-moon-100 font-semibold">
                OR SIGN IN WITH
              </p>
              <div className="flex-1 bg-sun-500 dark:bg-moon-100 h-[1px]"></div>
            </div>

            <OAuth />

            <div className="flex items-center gap-1">
              <p>Don't have an account?</p>
              <Link
                className="text-blue-500 p-1 px-1.5 font-medium rounded-md hover:bg-sun-400 dark:hover:bg-moon-200"
                to="/account/register">
                Sign Up.
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
