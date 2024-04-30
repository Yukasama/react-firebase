import { useState, useEffect } from "react";
import { Button } from "../../components/forms/Button";
import { EmailInput, PasswordInput } from "../../components/forms/Input";
import { useAuth } from "../../contexts/AuthContext";

export default () => {
  const { user, updateEmail } = useAuth();

  const [newEmail, setNewEmail] = useState("");
  const [validNewEmail, setValidNewEmail] = useState(false);
  const [pwd, setPwd] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError("");
  }, [newEmail]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!validNewEmail) {
      setError("Invalid Entry");
      return;
    }
    if (user) {
      updateEmail(user, newEmail, pwd);
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <EmailInput
          id="email"
          onChange={setNewEmail}
          valid={setValidNewEmail}
        />
        <PasswordInput id="pwd" onChange={setPwd} />

        <Button disabled={!validNewEmail} name="Change Email" />
      </form>
    </div>
  );
};
