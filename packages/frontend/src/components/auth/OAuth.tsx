import { useAuth } from "../../contexts/AuthContext";

export const OAuth: React.FC = () => {
  const {
    authWithGoogle,
    authWithFacebook,
    authWithMicrosoft,
    authWithGithub,
  } = useAuth();

  return (
    <div className="flex items-center justify-around">
      <div
        title="Authenticate with Google"
        style={{ transition: "width 0.25s" }}
        className="group relative flex items-center hover:w-[160px] w-[55px] p-2 rounded-lg cursor-pointer bg-sun-100 dark:bg-moon-200 dark:hover:bg-moon-100"
        onClick={authWithGoogle}>
        <img
          className="h-10 w-10 scale-90 group-hover:scale-75 duration-300"
          src="../../../google.png"
          alt="google"
        />
        <div className="absolute opacity-0 delay-200 duration-200 scale-90 left-[57px] flex-col group-hover:opacity-100 group-hover:scale-100">
          <p className="text-[13px] transition-none opacity-0 group-hover:opacity-100 font-medium">
            Continue
          </p>
          <p className="text-[13px] transition-none opacity-0 group-hover:opacity-100 font-medium">
            With Google
          </p>
        </div>
      </div>

      <div
        title="Authenticate with Facebook"
        style={{ transition: "width 0.25s" }}
        className="group relative flex items-center hover:w-[160px] w-[55px] p-2 rounded-lg cursor-pointer bg-sun-100 dark:bg-moon-200 dark:hover:bg-moon-100"
        onClick={authWithFacebook}>
        <img
          className="h-10 w-10 scale-90 group-hover:scale-75 duration-300"
          src="../../../facebook.png"
          alt="facebook"
        />
        <div className="absolute opacity-0 delay-200 duration-200 scale-90 left-[57px] flex-col group-hover:opacity-100 group-hover:scale-100">
          <p className="text-[13px] transition-none opacity-0 group-hover:opacity-100 font-medium">
            Continue
          </p>
          <p className="text-[13px] transition-none opacity-0 group-hover:opacity-100 font-medium">
            With Facebook
          </p>
        </div>
      </div>

      <div
        title="Authenticate with Microsoft"
        style={{ transition: "width 0.25s" }}
        className="group relative flex items-center hover:w-[160px] w-[55px] p-2 rounded-lg cursor-pointer bg-sun-100 dark:bg-moon-200 dark:hover:bg-moon-100"
        onClick={authWithMicrosoft}>
        <img
          className="h-10 w-10 scale-90 group-hover:scale-75 duration-300"
          src="../../../microsoft.png"
          alt="microsoft"
        />
        <div className="absolute opacity-0 delay-200 duration-200 scale-90 left-[57px] flex-col group-hover:opacity-100 group-hover:scale-100">
          <p className="text-[13px] transition-none opacity-0 group-hover:opacity-100 font-medium">
            Continue
          </p>
          <p className="text-[13px] transition-none opacity-0 group-hover:opacity-100 font-medium">
            With Microsoft
          </p>
        </div>
      </div>

      <div
        title="Authenticate with GitHub"
        style={{ transition: "width 0.25s" }}
        className="group relative flex items-center hover:w-[160px] w-[55px] p-2 rounded-lg cursor-pointer bg-sun-100 dark:bg-moon-200 dark:hover:bg-moon-100"
        onClick={authWithGithub}>
        <img
          className="h-10 w-10 dark:invert scale-90 group-hover:scale-75 duration-300"
          src="../../../github.png"
          alt="github"
        />
        <div className="absolute opacity-0 delay-200 duration-200 scale-90 left-[57px] flex-col group-hover:opacity-100 group-hover:scale-100">
          <p className="text-[13px] transition-none opacity-0 group-hover:opacity-100 font-medium">
            Continue
          </p>
          <p className="text-[13px] transition-none opacity-0 group-hover:opacity-100 font-medium">
            With GitHub
          </p>
        </div>
      </div>
    </div>
  );
};
