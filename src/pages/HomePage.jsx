import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "../firebase/auth";



export default function HomePage() {
  const navigate  = useNavigate();

   const [showPopup, setShowPopup] = useState(true); // Show popup on load
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handlelogout = async () => {
    await doSignOut();
    navigate("/");
  }

   const handleExploreClick = (subject) => {
    setSelectedSubject(subject);
    setShowPopup(true);
  };

  const handleClassSelect = (className) => {
    console.log(`Selected class ${className} for ${selectedSubject?.title || "default subject"}`);
    setShowPopup(false);
    // Optional: localStorage.setItem("hasSelectedClass", "true");
    // You can redirect or load data here
  };

  return (

   <div className="relative min-h-screen">
    {/* Content blur & dim effect */}
    <div className={`transition-all duration-300 ${showPopup ? "blur-md brightness-75" : ""}`}>

      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <div className="text-xl font-bold text-purple-800">Name of Website</div>
        <nav className="space-x-4">
          <a href="#" className="text-gray-700 hover:text-purple-700">Home</a>
          <a href="#" className="text-gray-700 hover:text-purple-700">Subjects</a>
          <a href="#" className="text-gray-700 hover:text-purple-700">My Progress</a>
          <a href="#" className="text-gray-700 hover:text-purple-700">Help</a>
          <button className="ml-4 border border-purple-700 text-purple-700 px-3 py-1 rounded hover:bg-purple-700 hover:text-white" onClick={handlelogout}>
            Log Out
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-purple-800 text-white text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Empowering Youth Through Education</h1>
        <p className="mb-6">Access quality educational content. Learn at your own pace, anytime, anywhere.</p>
      
      </section>

      {/* Testimonial */}
      <div className="bg-purple-100 text-center py-4 text-sm italic text-gray-700">
        "This app helped me pass my exams with flying colors!" — Priya, Class 10
      </div>

      {/* Featured Subjects */}
      <section className="py-12 px-4 text-center">
        <h2 className="text-2xl font-bold mb-8">Featured Subjects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "Mathematics",
              desc: "Master algebra, geometry, and more with interactive lessons.",
              icon: "📚",
            },
            {
              title: "Science",
              desc: "Learn physics, chemistry, and biology concepts with video tutorials.",
              icon: "🧪",
            },
            {
              title: "Hindi",
              desc: "Improve your language skills with comprehensive lessons and practice.",
              icon: "📝",
            },
            {
              title: "Social Studies",
              desc: "Discover history, geography, and civics through engaging content.",
              icon: "🌍",
            },
          ].map((subject, idx) => (
            <div key={idx} className="bg-white shadow rounded-2xl p-6 text-center">
              <div className="text-4xl mb-4">{subject.icon}</div>
              <h3 className="font-bold text-lg mb-2">{subject.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{subject.desc}</p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded">
                Explore
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>

        {/* Popup Modal */}
 {showPopup && (
  <div className="absolute inset-0 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-96 text-center shadow-2xl">
      <h2 className="text-xl font-semibold mb-4">Select Your Class</h2>
      <div className="space-y-2">
        {["Class 9", "Class 10", "Class 11", "Class 12"].map((cls, idx) => (
          <button
            key={idx}
            onClick={() => handleClassSelect(cls)}
            className="block w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
          >
            {cls}
          </button>
        ))}
      </div>
      <button
        onClick={() => setShowPopup(false)}
        className="mt-4 text-sm text-gray-600 hover:underline"
      >
        Cancel
      </button>
    </div>
  </div>
)}


    </div>
  );
}
