import React from "react";
import { Navbar } from "../components/navBar";
import Card from "../components/Card";
import InterviewCard from "../components/InterviewCard";

const Home = () => {
  return (
    <div className="w-screen overflow-y-auto ">
      <Navbar />
      <div className="flex flex-wrap pt-10 pl-20 gap-10  ">
        <Card title="Recent Interviews" count={5} buttonText="View All" buttonLink="/interviews" />
        <Card
          title="Upcoming Mock"
          count={new Date().toLocaleDateString()}
          buttonText="View Schedule"
          buttonLink="/schedule"

        />
        <Card title="Latest Score" count={`90%`} buttonText="View Report" buttonLink="/report"  />
      </div>

      <div className="pl-20 pt-10 mr-24 pb-5">
        <div className="flex items-center justify-between">
          <div className="left">
            <h1 className="text-2xl font-md">My Interviews</h1>
          </div>
          <div className="right">
            <button className="flex cursor-pointer items-center gap-3 bg-gradient-to-r from-pink-400 to-blue-400 text-white px-8 py-2 rounded-xl hover:from-pink-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-sm">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Interview
            </button>
          </div>
        </div>


        <div className="flex gap-4 mt-6">
          <select className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-400 text-sm focus:outline-none focus:border-cyan-500 focus:text-white transition-all duration-300 cursor-pointer">
            <option value="">All Roles</option>
            <option value="frontend">Frontend Developer</option>
            <option value="backend">Backend Engineer</option>
            <option value="fullstack">Full Stack Developer</option>
            <option value="software">Software Engineer</option>
            <option value="devops">DevOps Engineer</option>
            <option value="data">Data Scientist</option>
          </select>


          <select className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-400 text-sm focus:outline-none focus:border-cyan-500 focus:text-white transition-all duration-300 cursor-pointer">
            <option value="">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>


          <select className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-400 text-sm focus:outline-none focus:border-cyan-500 focus:text-white transition-all duration-300 cursor-pointer">
            <option value="">All Packages</option>
            <option value="0-50">$0 - $50k</option>
            <option value="50-100">$50k - $100k</option>
            <option value="100-150">$100k - $150k</option>
            <option value="150-200">$150k - $200k</option>
            <option value="200+">$200k+</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap  pl-20 gap-15 mb-10 ">
        <InterviewCard
          imageSrc="https://i.pinimg.com/736x/b8/11/f5/b811f50e9391aa181230d7ab14695a2b.jpg"
          title="Software Engineer Intern"
          company="Google"
          date="15 Dec 2023"
          salary="$120k"
          tags={["JavaScript", "React", "Node.js"]}
        />

        <InterviewCard
          imageSrc="https://i.pinimg.com/736x/f5/95/89/f59589ddf337f0e2437581a3ecebfad0.jpg"
          title="Backend Engineer Intern"
          company="Amazon"
          date="5 Feb 2024"
          salary="$118k"
          tags={["Java", "Spring Boot", "AWS", "Microservices"]}
        />

        <InterviewCard
          imageSrc="https://i.pinimg.com/736x/c8/b9/2e/c8b92e1f21be428653bb7e3431c5f8d6.jpg"
          title="Frontend Developer Intern"
          company="Meta"
          date="10 Mar 2024"
          salary="$125k"
          tags={["React", "Redux", "GraphQL", "TailwindCSS"]}
        />
      </div>
    </div>
  );
};

export default Home;
