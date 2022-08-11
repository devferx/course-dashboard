import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  typeStyle?: "primary" | "outline";
}

export const Button = ({
  typeStyle = "primary",
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={
        typeStyle == "primary"
          ? "py-3 px-6 bg-black  rounded-lg text-white text1-semibold border-2 border-transparent"
          : "py-3 px-6 bg-white rounded-lg text-black text1-semibold border-2 border-black"
      }
      {...props}
    >
      {children}
    </button>
  );
};
