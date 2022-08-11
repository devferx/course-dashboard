import React from "react";

interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: Array<{
    label: string;
    value: string;
  }>;
}

export const FormSelect = ({
  label,
  options,
  name,
  ...props
}: FormSelectProps) => {
  return (
    <div className="flex flex-col gap-[6px]">
      <label className="text2-medium" htmlFor={name}>
        {label}
      </label>
      <select className="p-3 rounded-[4px]" name={name} id={name} {...props}>
        <option value="">Elege una opción</option>
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
