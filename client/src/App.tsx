import axios from "axios";
import * as React from "react";

export const useLog = (label: string, value: any) => {
  React.useEffect(() => {
    console.log({ [label]: value });
  }, [value]);
};

function App() {
  const [prompt, setPrompt] = React.useState("");
  const [maxTokens, setMaxTokens] = React.useState(250);
  const [resText, setResText] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const submitPrompt = async () => {
    setLoading(true);
    await axios.post("/ai", { prompt, maxTokens }).then((res) => {
      console.log({ data: res.data });
      setLoading(false);
      setResText(res.data.text);
    });
  };

  return (
    <div className="w-screen flex">
      <div className="w-1/2">
        <div className="p-2">
          <h2>Welcome to OpenAI Code Assist!</h2>
          <p className="">
            Write your prompt for code completion, select desired response
            length and click GET.
          </p>
        </div>
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
            <span className="mr-2">Response length: {maxTokens}</span>
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
            className={`border p-1 px-4 ${loading ? "disabled" : ""}`}
            type="submit"
          >
            {loading ? "..." : "GET"}
          </button>
        </form>
      </div>
      <div className="w-1/2">
        <p className="whitespace-pre-wrap indent-2">
          {loading ? "Loading..." : resText}
        </p>
      </div>
    </div>
  );
}

export default App;
