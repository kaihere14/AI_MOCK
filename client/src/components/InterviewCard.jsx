import React from "react";

const InterviewCard = (props) => {
  const tags = ["JavaScript", "React", "Node.js"];
  return (
    <div
      className="bg-[#18252C] rounded-2xl min-h-50 w-[27%] py-6 px-3 overflow-hidden shadow-lg gap-2 flex flex-col cursor-pointer hover:bg-[#1f2f38] transition-all duration-300 hover:shadow-xl hover:scale-105"
      onClick={props.onClick}
    >
      <img
        src={props.imageSrc || "https://via.placeholder.com/150"}
        alt="Interview Thumbnail"
        className=" h-30 w-full object-cover rounded-2xl"
      />
      <h1 className="capitalize text-xl ">{props.title || "Job Title"}</h1>
      <div className="text-gray-400">
        <p>{props.company || "Company Name"}</p>
        <p>
          {props.date || "Date"} - {props.salary || "$0"}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {props.tags &&
          props.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-[#173E52] text-center text-[#13A4EC] w-30 rounded-full px-2 py-1 text-sm"
            >
              {tag}
            </span>
          ))}
      </div>
    </div>
  );
};

export default InterviewCard;
