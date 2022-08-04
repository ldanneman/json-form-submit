import React from "react";

function TextField({ ...props }) {
  return <textarea rows="4" cols="50" {...props}></textarea>;
}

export default TextField;
