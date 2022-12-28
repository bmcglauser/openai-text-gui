import * as React from "react";
import { PromptForm } from "./components/PromptForm";
import { ResponseText } from "./components/ResponseText";

export const useLog = (label: string, value: any) => {
  React.useEffect(() => {
    console.log({ [label]: value });
  }, [value]);
};

export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

function App() {
  const [resText, setResText] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

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
        <PromptForm
          setResText={setResText}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
      {isLoading ? (
        <p className="p-4">"Loading..."</p>
      ) : (
        <ResponseText text={resText} />
      )}
    </div>
  );
}

export default App;
