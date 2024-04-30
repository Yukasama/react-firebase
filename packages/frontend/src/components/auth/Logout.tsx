import { useAuth } from "../../contexts/AuthContext";

type LogoutProps = {
  setShow: (value: boolean) => void;
};

const Logout: React.FC<LogoutProps> = (props) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    props.setShow(false);
    logout();
  };

  return (
    <div
      className={`absolute left-[calc(50%-300px)] p-8 flex flex-col justify-between 
    rounded-lg top-[200px] h-[350px] w-[600px] bg-sun-200 dark:bg-moon-500`}>
      <div>
        <p className="text-[20px] font-medium">Sign Out?</p>
        <p className="text-sun-600">Are you sure you want to logout?</p>
      </div>
      <div className="flex gap-5 mr-10 justify-end w-full">
        <button
          onClick={() => props.setShow(false)}
          className="font-medium p-2 px-5 rounded-md bg-blue-500 hover:bg-blue-600 text-sun-100">
          Cancel
        </button>
        <button
          onClick={handleLogout}
          className="font-medium p-2 px-5 rounded-md bg-red-500 hover:bg-red-600 text-sun-100">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
