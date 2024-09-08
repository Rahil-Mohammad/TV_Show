import { FC, InputHTMLAttributes } from "react";
import { BsSearch } from "react-icons/bs";

type SearchBarProps = InputHTMLAttributes<HTMLInputElement>;

const SearchBar: FC<SearchBarProps> = (props) => {
  return (
    <div className="relative">
      <input
        {...props}
        type={props.type || "text"}
        aria-label="Search"
        className="px-2 py-1 pr-10 w-full rounded-full border border-black"
        placeholder="Search"
      />
      <BsSearch className="absolute right-4 top-1/2 -translate-y-1/2" />
    </div>
  );
};

export default SearchBar;
