// src/pages/SelectPage.jsx
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function SelectPage() {
  const [stream, setStream] = useState("")
  const [selectedClass, setSelectedClass] = useState("")
  const navigate = useNavigate()

  const handleContinue = () => {
    if (!stream || !selectedClass) {
      alert("Please select both stream and class.")
      return
    }

    // Optional: Save selection to localStorage or context if needed
    // localStorage.setItem("userStream", stream);
    // localStorage.setItem("userClass", selectedClass);

    navigate("/home")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold text-purple-800 text-center">Select Your Stream and Class</h2>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Stream</label>
          <select
            value={stream}
            onChange={(e) => setStream(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-800"
          >
            <option value="">-- Select Stream --</option>
            <option value="Science">Science</option>
            <option value="Commerce">Commerce</option>
            <option value="Arts">Arts</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Class</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-800"
          >
            <option value="">-- Select Class --</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
            <option value="11">Class 11</option>
            <option value="12">Class 12</option>
          </select>
        </div>

        <button
          onClick={handleContinue}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
