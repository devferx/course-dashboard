import type { InputHTMLAttributes } from "react";

import { SearchIcon } from "./icons/searchIcon";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const SearchInput = (props: SearchInputProps) => {
  return (
    <div className="flex gap-4 py-[14px] px-8 bg-white items-center w-[600px] rounded-full">
      <SearchIcon />
      <input
        className="h-full outline-none flex-1 text1-regular"
        type="text"
        placeholder="Buscar curso..."
        {...props}
      />
    </div>
  );
};
