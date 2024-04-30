import { ArrowRightAltOutlined } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

interface ButtonProps {
  disabled?: boolean;
  name: string;
  className?: string;
};

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      type="submit"
      className={`${
        props.className
      } bg-gradient-to-br flex-box text-white h-[45px] hover:from-blue-600
       hover:to-blue-700 rounded-[4px] text-sun-100 ${
         props.disabled
           ? "from-blue-400 to-blue-500"
           : "from-blue-500 to-blue-600"
       }`}
      disabled={props.disabled}>
      {props.disabled ? (
        <CircularProgress size={20} color="inherit" />
      ) : (
        <div className="flex-box gap-1">
          <p className="text-sun-100 text-[17px] tracking-[0.1] font-medium">
            {props.name}
          </p>
          <ArrowRightAltOutlined />
        </div>
      )}
    </button>
  );
};
