import React from "react";
import { useNavigate } from "react-router-dom";

const courses = [
  {
    title: "Mathematics",
    class: "Class 10 (Arts)",
    bgColor: "bg-purple-100",
    icon: "/art.jpg", // Replace with actual image path
  },
  {
    title: "Science",
    class: "Class 10 (Science)",
    bgColor: "bg-purple-100",
    icon: "/science-icon.png",
  },
  {
    title: "Social Science",
    class: "Class 11 (PCM)",
    bgColor: "bg-purple-100",
    icon: "/social-icon.png",
  },
  {
    title: "English",
    class: "Class 11(PCB)",
    bgColor: "bg-purple-100",
    icon: "/english-icon.png",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <div className="text-xl font-bold text-purple-800">Name of Website</div>
        <nav className="space-x-4">
          <a href="#" className="text-gray-700 hover:text-purple-700">Home</a>
          <a href="#" className="text-gray-700 hover:text-purple-700">Streams</a>
          <a href="#" className="text-gray-700 hover:text-purple-700">Courses</a>
          <a href="#" className="text-gray-700 hover:text-purple-700">Help</a>
          <button className="ml-4 border border-purple-700 text-purple-700 px-3 py-1 rounded hover:bg-purple-700 hover:text-white" onClick={() => navigate("/login")}>
            Log in/Sign Up
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-purple-800 text-white text-center py-30">
        <h1 className="text-4xl font-bold mb-4">Empowering Youth Through Education</h1>
        <p className="mb-6">Access quality educational content. Learn at your own pace, anytime, anywhere.</p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded"
        onClick={() => navigate("/login")}>
          Start Learning Now
        </button>
      </section>

    <div className="bg-purple-100 text-center py-30 text-sm text-gray-700">
        <div className="bg-green-50 rounded-xl p-6 shadow-md flex items-center justify-between w-[700px] h-[250px] mx-auto">
          <div div className="space-y-4 max-w-md">
            <h2 className="text-2xl font-bold text-gray-800">Student Dashboard</h2>
            <p className="text-gray-600">
               Get Lectures, Notes, DPPs &amp; NCERT Textbook Solutions.
           </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded">
              Student Dashboard
           </button>
          </div>
          <div className="hidden md:block">
            <img src="/studD.PNG" alt="Student Illustration" className="max-w-[300px]" />
          </div>
       </div>
    </div>

    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Popular Courses</h2>
        <button className="text-orange-500 bg-orange-100 hover:bg-orange-200 px-4 py-2 rounded-md font-semibold">
          View All Courses
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {courses.map((course, index) => (
          <div key={index} className="rounded-xl shadow-lg overflow-hidden">
            <div className={`p-6 ${course.bgColor} flex items-center justify-center h-48`}>
              <img src={course.icon} alt={course.title} className="w-20 h-20" />
            </div>
            <div className="bg-white p-4 space-y-3">
              
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded">
                {course.class}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="p-6 h-90 bg-white rounded-lg shadow-sm"> 
       <h2 className="text-2xl font-bold text-gray-800">Why (name of website)?</h2>
       <ul className="list-disc list-inside">
        <li className="mb-1">AI helping assistants available for 24*7 for doubts</li>
        <li className="mb-1">Second item</li>
        <li className="mb-1">Third item</li>
      </ul>
       </div>
  </div>
  );
}
