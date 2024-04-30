import { Search, Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState, useEffect, useRef } from "react";

interface EmailInputProps {
  id: string;
  onChange: Function;
  valid?: Function;
  focus?: boolean;
  note?: boolean;
}

export const EmailInput: React.FC<EmailInputProps> = (props) => {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const ref: any = useRef();

  const [input, setInput] = useState("");
  const [validInput, setValidInput] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);

  if (props.focus) {
    useEffect(() => {
      ref.current.focus();
    }, []);
  }

  const handleChange = (e: any) => {
    setInput(e.target.value);
    props.onChange(input);
  };

  const handleBlur = (e: any) => {
    setInput(e.target.value);
    props.onChange(e.target.value);
    setInputFocus(false);
  };

  if (props.valid !== undefined) {
    useEffect(() => {
      setValidInput(regex.test(input));
      props.valid!(regex.test(input));
    }, [input]);
  }

  return (
    <div>
      <div className="relative">
        <input
          className={`w-full text bg-sun-200 dark:bg-moon-300 p-3.5 pb-3 pt-4
            border rounded-md duration-300 ${
              inputFocus
                ? "border-blue-500"
                : !validInput && input && props.valid !== undefined
                ? "border-red-500"
                : "border-sun-400 dark:border-moon-100"
            }`}
          style={{ transition: "border 0.3s" }}
          type="email"
          id={props.id}
          ref={ref}
          onChange={handleChange}
          required
          autoComplete="email"
          aria-invalid={validInput ? "false" : "true"}
          aria-describedby={`${props.id}-note`}
          onFocus={() => setInputFocus(true)}
          onBlur={handleBlur}
        />
        <label
          htmlFor={props.id}
          className={`text-sun-900 absolute cursor-text duration-200 left-4 top-3.5
                ${
                  (inputFocus || input) &&
                  "translate-y-[-11px] translate-x-[-2px] text-[11px]"
                }`}>
          Email
        </label>
      </div>
      {props.note && (
        <div
          id={`${props.id}-note`}
          className={
            (inputFocus && input && !validInput) || (input && !validInput)
              ? ""
              : "hidden"
          }>
          <div className="bg-red-500 bg-opacity-20 border border-red-500 border-opacity-60 p-3 py-2 mt-2 rounded-lg">
            <p className="text-[12px] text-red-500">
              Please enter a valid email address
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

interface PasswordInputProps {
  id: string;
  onChange: Function;
  valid?: Function;
  focus?: boolean;
  note?: boolean;
  confPwd?: boolean;
  validMatch?: Function;
}

export const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const regex = /^(?=.*).{11,200}$/;
  const ref: any = useRef();

  const [input, setInput] = useState("");
  const [validInput, setValidInput] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);

  const [confPwd, setConfPwd] = useState("");
  const [validConfPwd, setValidConfPwd] = useState(false);
  const [confPwdFocus, setConfPwdFocus] = useState(false);
  const [confPwdVisible, setConfPwdVisible] = useState(false);

  if (props.focus) {
    useEffect(() => {
      ref.current.focus();
    }, []);
  }

  const handleChange = (e: any) => {
    setInput(e.target.value);
    props.onChange(e.target.value);
  };

  if (props.valid !== undefined) {
    useEffect(() => {
      setValidInput(regex.test(input));
      props.valid!(regex.test(input));
    }, [input]);
  }

  if (props.confPwd) {
    useEffect(() => {
      setValidConfPwd(input === confPwd);
      props.validMatch!(input === confPwd);
    }, [input, confPwd]);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="relative">
        <div>
          <input
            className={`w-full text bg-sun-200 dark:bg-moon-300 p-3.5 pb-3 pt-4
            border rounded-md duration-300 ${
              inputFocus
                ? "border-blue-500"
                : !validInput && input && props.valid !== undefined
                ? "border-red-500"
                : "border-sun-400 dark:border-moon-100"
            }`}
            style={{ transition: "border 0.3s" }}
            type={inputVisible ? "text" : "password"}
            id={props.id}
            ref={ref}
            onChange={handleChange}
            required
            autoComplete={props.confPwd ? "new-password" : "password"}
            aria-invalid={
              validInput && props.valid !== undefined ? "false" : "true"
            }
            aria-describedby={`${props.id}-note`}
            onFocus={() => setInputFocus(true)}
            onBlur={handleChange}
          />
          <label
            htmlFor={props.id}
            className={`text-sun-900 absolute cursor-text duration-200 left-4 top-3.5
                ${
                  (inputFocus || input) &&
                  "translate-y-[-11px] translate-x-[-2px] text-[11px]"
                }`}>
            Password
          </label>
          <div
            className="absolute right-4 top-3.5 cursor-pointer"
            onClick={() =>
              setInputVisible((prev) => (prev === false ? true : false))
            }>
            {inputVisible ? (
              <VisibilityOff className="text-sun-600" />
            ) : (
              <Visibility className="text-sun-600" />
            )}
          </div>
        </div>
        {props.note && (
          <div
            id="note"
            className={`${input && !validInput ? "" : "hidden"}
                bg-red-500 bg-opacity-20 border border-red-500 border-opacity-60 p-3 py-1.5 mt-2 rounded-lg`}>
            <p className="text-[12px] text-red-500">
              Passwords must be 11 or more characters
            </p>
          </div>
        )}
      </div>
      {props.confPwd && (
        <div className="relative">
          <div>
            <input
              className={`w-full text bg-sun-200 dark:bg-moon-300 p-3.5 pb-3 pt-4
              border rounded-md duration-300 ${
                confPwdFocus
                  ? "border-blue-500"
                  : !validConfPwd && confPwd
                  ? "border-red-500"
                  : "border-sun-400 dark:border-moon-100"
              }`}
              style={{ transition: "border 0.3s" }}
              type={confPwdVisible ? "text" : "password"}
              id="confPwd"
              onChange={(e) => setConfPwd(e.target.value)}
              required
              autoComplete={props.confPwd ? "new-password" : "password"}
              aria-invalid={validConfPwd ? "false" : "true"}
              aria-describedby="noteConfPwd"
              onFocus={() => setConfPwdFocus(true)}
              onBlur={() => setConfPwdFocus(false)}
            />
            <label
              htmlFor="confPwd"
              className={`text-sun-900 absolute cursor-text duration-200 left-4 top-3.5
                  ${
                    (confPwdFocus || confPwd) &&
                    "translate-y-[-11px] translate-x-[-2px] text-[11px]"
                  }`}>
              Confirm Password
            </label>
            <div
              className="absolute right-4 top-3.5 cursor-pointer"
              onClick={() =>
                setConfPwdVisible((prev) => (prev === false ? true : false))
              }>
              {confPwdVisible ? (
                <VisibilityOff className="text-sun-600" />
              ) : (
                <Visibility className="text-sun-600" />
              )}
            </div>
          </div>
          <div
            id="noteConfPwd"
            className={`${
              (confPwdFocus && confPwd && !validConfPwd) ||
              (confPwd && !validConfPwd)
                ? ""
                : "hidden"
            }
                bg-red-500 bg-opacity-20 border border-red-500 border-opacity-60 p-3 py-1.5 mt-2 rounded-lg`}>
            <p className="text-[12px] text-red-500">
              Must match first Password
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

interface SelectProps {
  id: string;
  options: string[];
  setOption: (option: string) => void;
}

export const Select: React.FC<SelectProps> = (props) => {
  const [option, setOption] = useState(props.options[0]);

  return (
    <select
      className="text bg-moon-200 border border-blue-500 px-10 p-2"
      id={props.id}>
      {props.options.map((option, index) => (
        <option key={option + index}>{option}</option>
      ))}
    </select>
  );
};

interface SearchbarProps {}

export const Searchbar: React.FC<SearchbarProps> = (props) => {
  return (
    <div className={`bg-sun-400 dark:bg-moon-400 rounded-md pl-3.5 my-0.5`}>
      <input
        className="bg-sun-400 text dark:bg-moon-400 lg:w-[300px]"
        placeholder="Search"
      />
      <IconButton>
        <Search className="text" />
      </IconButton>
    </div>
  );
};
