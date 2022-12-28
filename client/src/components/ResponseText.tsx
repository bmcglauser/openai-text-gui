type ResponseTextProps = {
  text: string;
};

export const ResponseText: React.FC<ResponseTextProps> = ({ text }) => {
  const isErrorMessage = /^Error:\s/.test(text);
  const noIndent = "indent-0";
  const standardClasses = "whitespace-pre-wrap indent-2 p-4";
  return (
    <p
      className={`${standardClasses} ${
        isErrorMessage || text.length < 40 ? noIndent : ""
      }`}
    >
      {text}
    </p>
  );
};
