import React, { useState } from "react";
import search_icon from "../../assets/search_icon.svg";
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
    <div className={` px-18 w-screen text-gray-900`}>
      <form
        onSubmit={onHandlerFunction}
        className={`flex justify-between items-center px-4 py-1 rounded-2xl bg-white `}
      >
        <div className={`flex gap-2`}>
          <img src={search_icon} alt="" className={`p-4`} />
          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value)
            }
            value={input}
            className={`w-4xl text-lg focus:outline-none hover:bg-amber-50`}
            placeholder="Search for courses ..."
          />
        </div>
        <Button
          type="submit"
          title="Search"
          classname="bg-blue-700 w-30 h-10  text-white rounded-xl"
        />
      </form>
    </div>
  );
}

export default SearchBar;
