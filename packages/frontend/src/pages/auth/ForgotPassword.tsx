import { useState } from "react";
import { EmailInput } from "../../components/forms/Input";
import { Button } from "../../components/forms/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default () => {
  const { user, resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email) return setError("Please enter an email");
    else if (!validEmail) return setError("Please enter a valid email");

    setError("");
    setLoading(true);
    await resetPassword(email);
    setSent(true);
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
          <div>
            <div className="h-8 w-0.5 bg-blue-600 absolute left-0"></div>
            <p
              className={`text-blue-500 text-2xl font-medium ${
                error === "" ? "" : "mb-[-10px]"
              }`}>
              Reset Your Password
            </p>
            <p className="text-sun-800 mb-5 text-[14px]">
              {!sent
                ? "Enter the email associated with your account and we'll send you a reset link"
                : "Email has been sent!"}
            </p>
            {!sent ? (
              <form
                onSubmit={handleSubmit}
                autoComplete="off"
                className="flex flex-col gap-5">
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

                <Button disabled={loading} name="Reset Password" />
              </form>
            ) : (
              <div className="flex items-center gap-1">
                <p>Password successfully changed?</p>
                <Link
                  className="text-blue-500 p-1 px-1.5 font-medium rounded-md hover:bg-sun-400 dark:hover:bg-moon-200"
                  to="/account/login">
                  Head to Login.
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
