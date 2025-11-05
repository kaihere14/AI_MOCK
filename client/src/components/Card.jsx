import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Card = (props) => {
  const navigate = useNavigate();
  const { updateActiveItem } = useAppContext();

  const handleClick = () => {
    navigate(props.buttonLink || "/");
    updateActiveItem("Interviews");
  };

  return (
    <div className="bg-[#18252C] py-4 sm:py-6 px-4 sm:px-6 md:px-8 rounded-2xl gap-3 flex flex-col w-full">
      <h1 className="text-gray-400 text-sm sm:text-base">{props.title}</h1>
      <p className="text-2xl sm:text-3xl font-bold">{props.count}</p>
      <span
        onClick={handleClick}
        className="cursor-pointer text-blue-400 text-sm sm:text-base"
      >
        {props.buttonText}
      </span>
    </div>
  );
};

export default Card;
