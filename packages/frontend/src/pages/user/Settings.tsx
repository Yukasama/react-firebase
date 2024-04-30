import ChangePassword from "../auth/ChangePassword";
import ChangeEmail from "../auth/ChangeEmail";

export default () => {
  return (
    <div>
      <h2>Settings</h2>
      <ChangePassword />
      <ChangeEmail />
    </div>
  );
};
