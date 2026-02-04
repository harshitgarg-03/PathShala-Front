import React from 'react'

function Button({ title, classname, type }: ButtonProp) {
  return (
    <button
    type={type}
      className={`
        px-4 py-2  
        rounded-xl
        font-medium
        text-gray-700
        hover:text-green-500
        hover:bg-green-50
        transition-all
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-green-400
        cursor-pointer
        ${classname}
      `}
    >
      {title}
    </button>
  );
}

export default Button;
