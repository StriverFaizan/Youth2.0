
import React from "react";

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
  {
    class: "Class 11 (Commerce)",
    bgColor: "bg-white",
    icon: "/commerce.png",
  },
    {
    class: "Class 12 (PCM)",
    bgColor: "bg-white",
    icon: "/pcm.jpeg",
  },
  {
    class: "Class 12 (PCB)",
    bgColor: "bg-white",
    icon: "/pcb.jpeg",
  },
  {
    class: "Class 12 (Humanities)",
    bgColor: "bg-white",
    icon: "/humanities.png",
  },
];

export default function CoursesPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {courses.map((course, index) => (
        <div key={index} className="rounded-xl shadow-lg overflow-hidden">
          <div
            className={`p-6 ${course.bgColor} flex items-center justify-center h-48`}
          >
            <img src={course.icon} alt="" className="w-40 h-40" />
          </div>
          <div className="bg-white p-4 space-y-3">
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded">
              {course.class}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
