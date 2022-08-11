import type { InputHTMLAttributes } from "react";

interface FormControlProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  labelText: string;
}

export const FormControl = ({
  name,
  labelText,
  ...inputProps
}: FormControlProps) => {
  return (
    <div className="flex flex-col gap-[6px]">
      <label className="text2-medium" htmlFor={name}>
        {labelText}
      </label>
      <input
        className="p-3 tex2-regular rounded-[4px]"
        {...inputProps}
        id={name}
        name={name}
      />
    </div>
  );
};
