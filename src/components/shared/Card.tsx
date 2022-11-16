import React from "react";

type PropTypes = {
  children: React.ReactNode;
  className?: string;
};

function Card({ children, className }: PropTypes) {
  return <div className={`card ${className}`}>{children}</div>;
}

export default Card;
