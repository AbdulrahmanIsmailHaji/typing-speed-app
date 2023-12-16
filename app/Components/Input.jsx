import React from "react";

const Input = ({ currInput, handleKeyDown, inputRef, setCurrInput }) => {
  return (
    <>
      <div className="input-field">
        <textarea
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
