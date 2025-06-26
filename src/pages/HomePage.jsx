import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "../firebase/auth";
import { auth } from "../firebase/firebase";

export default function HomePage() {
  const navigate  = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handlelogout = async () => {
    await doSignOut();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <div className="text-xl font-bold text-purple-800">Name of Website</div>
        <nav className="space-x-4 flex items-center">
          <a href="#" className="text-gray-700 hover:text-purple-700">Home</a>
          <a href="#" className="text-gray-700 hover:text-purple-700">Subjects</a>
          <a href="#" className="text-gray-700 hover:text-purple-700">My Progress</a>
          <a href="#" className="text-gray-700 hover:text-purple-700">Help</a>
          {user && user.photoURL ? (
            <div className="relative inline-block">
              <div
                className="flex items-center ml-4 cursor-pointer"
                onClick={() => setShowMenu((prev) => !prev)}
              >
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-purple-700"
                />
                <span
                  className={`ml-1 text-lg transition-transform duration-200 ${
                    showMenu ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </div>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-purple-100">Profile</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-purple-100">Settings</a>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-100"
                    onClick={handlelogout}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="ml-4 border border-purple-700 text-purple-700 px-3 py-1 rounded hover:bg-purple-700 hover:text-white" onClick={handlelogout}>
              Log Out
            </button>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-purple-800 text-white text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Empowering Youth Through Education</h1>
        <p className="mb-6">Access quality educational content. Learn at your own pace, anytime, anywhere.</p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded">
          Start Learning Now
        </button>
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
      );
}