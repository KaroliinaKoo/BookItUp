import React from "react";
import { FaTimes } from "react-icons/fa";

export type Props = {
  fieldName: string;
  handleClick: (fieldName: string) => void;
  display: boolean;
  children?: any;
  className?: string;
};

const ClearInputBtn = ({
  fieldName,
  handleClick,
  display,
  children,
  className,
  ...rest
}: Props) => {
  return (
    <button
      aria-hidden={!display}
      style={{ display: display ? "flex" : "none" }}
      aria-label={`Clear form field: ${fieldName}`}
      id={fieldName}
      type="button"
      onClick={(e) => handleClick(e.currentTarget.id)}
      className={`${className ? className : ""} clear-input-btn`}
      {...rest}
    >
      {children}
      <FaTimes />
    </button>
  );
};

export default ClearInputBtn;
