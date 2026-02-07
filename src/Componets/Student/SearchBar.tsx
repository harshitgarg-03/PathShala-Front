import React, { useState } from "react";
import search_icon from "../../Data/search_icon.svg";
import Button from "../ReuseCompo/Button";
import { useNavigate } from "react-router-dom";
function SearchBar() {
  const navigate = useNavigate();
  const [input, setInput] = useState<string>("");

  function onHandlerFunction(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if(input.length > 0){
      navigate("/Course-List/" + input);
    }
  }
  return (
    <div className="text-gray-900 px-4 sm:px-8 md:px-12">

  <form
    onSubmit={onHandlerFunction}
    className="flex items-center justify-between
    bg-white rounded-full shadow-md
    px-3 sm:px-4 md:px-6
    py-1 sm:py-2"
  >
    <div className="flex items-center gap-2 sm:gap-3 w-full">

      <img
        src={search_icon}
        alt=""
        className="p-2 sm:p-3"
      />

      <input
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
        value={input}
        className="flex-1 text-sm sm:text-base md:text-lg
        focus:outline-none bg-transparent
        placeholder-gray-400"
        placeholder="Search for courses..."
      />
    </div>
    <Button
      type="submit"
      title="Search"
      classname="bg-blue-700 hover:bg-blue-800
      w-24 sm:w-28 md:w-32
      h-9 sm:h-10 md:h-11
      text-white rounded-full
      px-4 transition"
    />

  </form>

</div>

  );
}

export default SearchBar;
