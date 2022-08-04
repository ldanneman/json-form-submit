import React from "react";
import "./button.css";

function Button({ children, onClick, ...props }) {
  return (
    <button onClick={onClick} className="button" {...props}>
      {children}
    </button>
  );
}

export default Button;
