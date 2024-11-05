import React, { useContext } from "react";
import { TailSpin } from "react-loader-spinner";
import Icon from "../../atoms/Icon";
import Input from "../../atoms/Input";
import SidebarContext from "../../../context/SidebarContext";

const SearchBar = ({ value, onChange, loading }) => {
  const { expanded } = useContext(SidebarContext);
  return (
    <div
      className={`w-[85%] flex relative border items-center m-auto h-9 rounded-md my-2 ${
        !expanded && "hidden"
      }`}
    >
      <Input
        type="search"
        name="search"
        placeholder="Search User"
        className="w-[90%] h-full p-2 rounded-md outline-none text-md text-gray-600"
        value={value}
        onChange={onChange}
      />
      {loading && (
        <Icon
          icon={TailSpin}
          height={14}
          width={14}
          color="black"
          className="absolute top-1/2 right-0 -translate-y-1/2"
        />
      )}
    </div>
  );
};

export default SearchBar;
