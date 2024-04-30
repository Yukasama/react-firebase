import { useState } from "react";
import { Button } from "../../components/forms/Button";
import { PasswordInput } from "../../components/forms/Input";
import { useNotify } from "../../contexts/NotifyContext";

export default () => {
  const { showPopup } = useNotify();

  const [pwd, setPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [validNewPwd, setValidNewPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!validNewPwd) return showPopup("Invalid Password.", "error");
    else if (!validMatch) return showPopup("Passwords must match.", "error");
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <PasswordInput id="pwd" focus={true} onChange={setPwd} />
        <PasswordInput
          id="newPwd"
          onChange={setNewPwd}
          valid={setValidNewPwd}
          confPwd={true}
          validMatch={setValidMatch}
        />

        <Button disabled={loading} name="Change Password" />
      </form>
    </div>
  );
};
