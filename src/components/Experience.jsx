import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaBriefcase } from "react-icons/fa";

const Experience = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="container mx-auto px-6 py-10 bg-gradient-to-b from-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-400" data-aos="fade-down">
        Experience
      </h1>
      <div
        className="flex justify-center"
        data-aos="zoom-in"
      >
        <div className="bg-gradient-to-r from-indigo-700 to-purple-900 p-6 rounded-lg shadow-lg w-96 text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <FaBriefcase className="text-5xl text-yellow-400 animate-pulse mx-auto" />
          <h2 className="text-2xl font-semibold text-white mt-4">MERN Stack Internship</h2>
          <h3 className="text-xl font-medium text-yellow-300 mt-1">Prep Lab</h3>
          <p className="mt-3 text-gray-200">
            Completed a MERN stack internship at Prep Lab where I built and optimized full-stack web applications. 
            Worked on developing RESTful APIs, integrating databases, and implementing frontend components using React. 
            Gained experience in authentication, performance optimization, and deployment of MERN applications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Experience;
