import React from "react";
import { useNavigate } from "react-router-dom";


const courses = [
 {
    class: "Class 9",
    bgColor: "bg-white",
    icon: "/art1.avif",
  },
  {
    class: "Class 10",
    bgColor: "bg-white",
    icon: "/science.png",
  },
  {
    class: "Class 11 (PCM)",
    bgColor: "bg-white",
    icon: "/pcm.jpeg",
  },
  {
    class: "Class 11(PCB)",
    bgColor: "bg-white",
    icon: "/pcb.jpeg",
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
        <h2 className="text-2xl font-bold text-gray-800">Featured Subjects</h2>
         <button
           onClick={() => navigate("/courses")}
            className="text-orange-500 bg-orange-100 hover:bg-orange-200 px-4 py-2 rounded-md font-semibold">
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

<div className="flex flex-col md:flex-row items-start max-w-7xl mx-auto p-6 md:p-12 gap-8">
  {/* Left Side Content */}
  <div className="w-full md:w-1/2 p-6 sm:p-8 space-y-4">
    <h2 className="text-3xl font-bold text-gray-800">
      Why <span className="text-orange-500">Name of Website</span>
    </h2>
    <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-relaxed">
      <li>AI-powered assistants available 24×7 for doubt solving</li>
      <li>High-quality, curriculum-aligned content for all classes</li>
      <li>Track your progress and learn at your own pace</li>
    </ul>
  </div>

  
  <div className="w-full md:w-1/2">
    <img src="/example-image.png" alt="Illustration" className="w-full h-auto rounded-lg shadow" />
  </div>
</div>



           {/* Footer */}
<footer className="bg-purple-800 text-white mt-10">
  <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    <div>
      <h3 className="font-bold text-lg mb-2">About Us</h3>
      <p className="text-sm">
        Empowering youth with accessible and quality education. Learn at your own pace, anytime.
      </p>
    </div>
    <div>
      <h3 className="font-bold text-lg mb-2">Quick Links</h3>
      <ul className="space-y-1 text-sm">
        <li><a href="#" className="hover:underline">Home</a></li>
        <li><a href="#" className="hover:underline">Courses</a></li>
        <li><a href="#" className="hover:underline">Streams</a></li>
        <li><a href="#" className="hover:underline">Help</a></li>
      </ul>
    </div>
    <div>
      <h3 className="font-bold text-lg mb-2">Contact</h3>
      <p className="text-sm">Email: support@example.com</p>
      <p className="text-sm">Phone: +91 12345 67890</p>
    </div>
    <div>
      <h3 className="font-bold text-lg mb-2">Follow Us</h3>
      <div className="flex space-x-4 mt-2">
        <a href="#" className="hover:text-orange-300">Facebook</a>
        <a href="#" className="hover:text-orange-300">Instagram</a>
        <a href="#" className="hover:text-orange-300">YouTube</a>
      </div>
    </div>
  </div>
  <div className="text-center text-sm text-gray-300 border-t border-purple-700 py-4">
    © {new Date().getFullYear()} Name of Website. All rights reserved.
  </div>
</footer>

  </div>
  );
}
