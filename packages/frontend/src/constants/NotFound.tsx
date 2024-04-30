import { Link } from "react-router-dom";
import { Button } from "../components/forms/Button";

export default () => {
  return (
    <div className="flex-box flex-col h-[680px]">
      <p className="font-bold text-[50px]">404</p>
      <p className="text-[20px] mb-5">Page Not Found.</p>
      <Link to="/">
        <Button className="px-10" name="Return To Homepage" />
      </Link>
    </div>
  );
};
