import React from "react";

const Input = ({
  statusCode,
  currInput,
  handleKeyDown,
  inputRef,
  setCurrInput,
}) => {
  return (
    <>
      <div className="input-field">
        <textarea
          disabled={statusCode === "finished"}
          value={currInput}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          type="text"
          id="input"
          name="input"
          onChange={(e) => setCurrInput(e.target.value)}
        />
      </div>
    </>
  );
};

export default Input;
