import React from "react";
import { FaTimes } from "react-icons/fa";

export type Props = {
  fieldName: string;
  display: boolean;
  children?: any;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ClearInputBtn = ({
  fieldName,
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
      className={`${className ? className : ""} clear-input-btn`}
      {...rest}
    >
      {children}
      <FaTimes />
    </button>
  );
};

export default ClearInputBtn;
