import { Checkbox } from "@mui/material";
import { useState } from "react";
import { Button } from "../../components/forms/Button";
import { Select } from "../../components/forms/Input";
import { useData } from "../../contexts/DataContext";

export default () => {
  const { create } = useData();
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await create("AAPL", false);
    setLoading(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <Select id="select" options={["All", "AAPL"]} setOption={setSelected} />
      <div className="flex items-center gap-1">
        <Checkbox
          defaultChecked
          className="text-blue-600 rounded-md p-1 hover:bg-blue-500 hover:bg-opacity-10"
        />
        <span className="text-sm text-sun-800">Keep me logged in</span>
      </div>
      <Button className="px-10" disabled={loading} name="Add" />
    </form>
  );
};
