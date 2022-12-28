import * as React from "react";
import axios from "axios";
import { StateSetter } from "../App";

type PromptFormProps = {
  isLoading: boolean;
  setIsLoading: StateSetter<boolean>;
  setResText: StateSetter<string>;
};

export const PromptForm: React.FC<PromptFormProps> = ({
  isLoading,
  setIsLoading,
  setResText,
}) => {
  const [prompt, setPrompt] = React.useState("");
  const [maxTokens, setMaxTokens] = React.useState(250);

  const submitPrompt = async () => {
    setIsLoading(true);
    try {
      await axios.post("/ai", { prompt, maxTokens }).then((res) => {
        setIsLoading(false);
        setResText(res.data.text.trim());
      });
    } catch (e: any) {
      setIsLoading(false);
      setResText(`Error: ${e?.message}`);
    }
  };

  return (
    <form
      className="flex flex-col items-start p-4 gap-4 w-full"
      onSubmit={(e) => {
        e.preventDefault();
        submitPrompt();
      }}
    >
      <textarea
        className="border p-1 w-full h-32 flex-shrink-0"
        placeholder="write prompt here"
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
      />
      <label className="flex flex-col">
        <span className="mr-2">Response max length: {maxTokens}</span>
        <input
          type="range"
          value={maxTokens}
          min={100}
          max={950}
          step={50}
          onChange={(e) => {
            setMaxTokens(+e.target.value);
          }}
        />
      </label>

      <button
        className={`border p-1 px-4 ${isLoading ? "disabled" : ""}`}
        type="submit"
      >
        {isLoading ? "..." : "GET"}
      </button>
    </form>
  );
};
