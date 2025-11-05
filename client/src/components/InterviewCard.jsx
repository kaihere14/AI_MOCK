import React from "react";

const InterviewCard = (props) => {
  return (
    <div
      className="bg-[#18252C] rounded-xl sm:rounded-2xl min-h-50 w-full sm:w-[48%] lg:w-[31%] xl:w-[27%] py-4 sm:py-6 px-3 sm:px-4 overflow-hidden shadow-lg gap-2 flex flex-col cursor-pointer hover:bg-[#1f2f38] transition-all duration-300 hover:shadow-xl hover:scale-[1.02] sm:hover:scale-105"
      onClick={props.onClick}
    >
      <img
        src={props.imageSrc || "https://via.placeholder.com/150"}
        alt="Interview Thumbnail"
        className="h-30 w-full object-cover rounded-xl sm:rounded-2xl"
      />
      <h1 className="capitalize text-lg sm:text-xl font-semibold line-clamp-2">
        {props.title || "Job Title"}
      </h1>
      <div className="text-gray-400 text-sm sm:text-base">
        <p className="truncate">{props.company || "Company Name"}</p>
        <p className="text-xs sm:text-sm truncate">
          {props.date || "Date"} - {props.salary || "$0"}
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {props.tags &&
          props.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-[#173E52] text-center text-[#13A4EC] rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm"
            >
              {tag}
            </span>
          ))}
      </div>
    </div>
  );
};

export default InterviewCard;
