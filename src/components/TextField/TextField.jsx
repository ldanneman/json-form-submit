import React from "react";

function TextField({ ...props }) {
  return (
    <textarea
      rows="20"
      cols="50"
      {...props}
      style={{ resize: "none" }}
    ></textarea>
  );
}

export default TextField;
