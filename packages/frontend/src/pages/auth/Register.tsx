import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { EmailInput, PasswordInput } from "../../components/forms/Input";
import { Button } from "../../components/forms/Button";
import { Checkbox } from "@mui/material";
import { OAuth } from "../../components/auth/OAuth";

export default () => {
  const { signUp, user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);

  useEffect(() => {
    setError("");
  }, [email, pwd]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!validEmail) return setError("Please enter a valid email.");
    else if (!validPwd) return setError("Please enter a valid password.");
    else if (!validMatch) return setError("Passwords do not match.");

    setError("");
    await signUp(email, pwd);
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className="flex flex-col gap-5 p-9 pr-[50px] w-[450px] rounded-xl m-[100px] 
        bg-sun-300 dark:bg-moon-400 bg-opacity-90 dark:bg-opacity-90 shadow-md relative">
        {user ? (
          <div>
            <p className="text-blue-500 text-2xl font-medium">
              Youre logged in
            </p>
            <Link to="/" className="text-sun-800 text-[14px]">
              Click here to to stuff
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="flex flex-col gap-5">
            <div className="h-8 w-0.5 bg-blue-600 absolute left-0"></div>
            <p
              className={`text-blue-500 text-2xl font-medium ${
                error === "" ? "" : "mb-[-10px]"
              }`}>
              Create Your Account
            </p>
            <div
              className={`bg-red-500 bg-opacity-20 border border-red-500 border-opacity-60 p-3 py-2 mt-2 mb-[-5px] rounded-lg ${
                error === "" && "hidden"
              }`}
              aria-live="assertive">
              <p className="text-red-500 text-[14px]">{error}</p>
            </div>

            <EmailInput
              id="email"
              onChange={setEmail}
              focus={true}
              note={true}
              valid={setValidEmail}
            />
            <PasswordInput
              id="pwd"
              onChange={setPwd}
              valid={setValidPwd}
              note={true}
              confPwd={true}
              validMatch={setValidMatch}
            />

            <div className="flex items-center gap-1">
              <Checkbox
                defaultChecked
                className="text-blue-600 rounded-md p-1 hover:bg-blue-500 hover:bg-opacity-10"
              />
              <span className="text-sm text-sun-800">Keep me logged in</span>
            </div>

            <Button disabled={loading} name="Sign Up" />
            <div className="flex-box gap-3">
              <div className="h-[1px] flex-1 bg-sun-500 dark:bg-moon-100"></div>
              <p className="text-sun-500 dark:text-moon-100 font-semibold">
                OR SIGN UP WITH
              </p>
              <div className="flex-1 bg-sun-500 dark:bg-moon-100 h-[1px]"></div>
            </div>

            <OAuth />

            <div className="flex items-center gap-1">
              <p>Already registered?</p>
              <Link
                className="text-blue-500 p-1 px-1.5 font-medium rounded-md hover:bg-sun-400 dark:hover:bg-moon-200"
                to="/account/login">
                Sign In.
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
