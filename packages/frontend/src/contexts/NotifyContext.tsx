import {
  Clear,
  HighlightOffOutlined,
  TaskAltOutlined,
} from "@mui/icons-material";
import { useContext, createContext, useState, useEffect } from "react";

const NotifyContext = createContext({} as any);
export function useNotify() {
  return useContext(NotifyContext);
}

type NotifyProviderProps = {
  children: React.ReactNode;
};

const NotifyProvider: React.FC<NotifyProviderProps> = (props) => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [type, setType] = useState("");
  const [width, setWidth] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  function showPopup(text: string, type: string) {
    setText(text);
    setType(type);
    setWidth(0);
    setShow(true);

    if (intervalId) {
      clearInterval(intervalId);
    }

    const newIntervalId = setInterval(() => {
      setWidth((prevWidth) => {
        if (prevWidth >= 100) {
          clearInterval(newIntervalId);
          setShow(false);
          return 100;
        }
        return prevWidth + 0.3;
      });
    }, 20);
    setIntervalId(newIntervalId);
  }

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const value = {
    showPopup,
  };

  return (
    <NotifyContext.Provider value={value}>
      {props.children}
      <div
        className={`fixed flex items-center top-5 h-[60px] right-5 w-[500px] 
      bg-sun-100 dark:bg-moon-100 py-4 rounded-md overflow-hidden z-10 shadow-sm duration-500 transition-transform ${
        !show && "translate-x-[600px]"
      }`}>
        <div>
          {type === "success" ? (
            <TaskAltOutlined className="m-5 text-green-500" />
          ) : (
            <HighlightOffOutlined className="m-5 text-red-500" />
          )}
        </div>

        <p className="flex-1">{text}</p>
        <div onClick={() => setShow(false)}>
          <Clear className="text-sun-700 dark:text-sun-500 text-[20px] m-5 ml-10 cursor-pointer" />
        </div>
        {type === "success" ? (
          <div
            className="h-1 bg-green-500 absolute bottom-0"
            style={{ width: `${width}%` }}></div>
        ) : (
          <div
            className="h-1 bg-red-500 absolute bottom-0"
            style={{ width: `${width}%` }}></div>
        )}
      </div>
    </NotifyContext.Provider>
  );
};

export default NotifyProvider;
