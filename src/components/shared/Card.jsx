import React from "react";

function Card({ className, children }) {
  return (
    <div className={className ? `${className} card` : `card`}>{children}</div>
  );
}

export default Card;
