"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../firebase/firebase" 

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setMessage("")
    setIsLoading(true)

    try {
      await sendPasswordResetEmail(auth, email)
      setMessage("If an account with that email exists, a password reset email has been sent.");
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("No account found with this email address.")
          break
        case "auth/invalid-email":
          setError("Please enter a valid email address.")
          break
        case "auth/too-many-requests":
          setError("Too many requests. Please try again later.")
          break
        default:
          setError("An unexpected error occurred. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToLogin = () => {
    navigate("/login") 
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <div className="text-xl font-bold text-purple-800">Name of Website</div>
        <nav className="space-x-4">
          <a href="#" className="text-gray-700 hover:text-purple-700">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-purple-700">
            Subjects
          </a>
          <a href="#" className="text-gray-700 hover:text-purple-700">
            My Progress
          </a>
          <a href="#" className="text-gray-700 hover:text-purple-700">
            Help
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center py-12 px-4">
        <div className="bg-white shadow rounded-2xl p-8 w-full max-w-md">
          {/* Form Title */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-purple-800 mb-2">Forgot Password?</h1>
            <p className="text-sm text-gray-600">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-transparent"
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>

            {/* Success message */}
            {message && (
              <div className="mt-2 text-green-600 text-sm font-semibold bg-green-50 p-3 rounded-lg border border-green-200">
                {message}
              </div>
            )}

            {/* Error message */}
            {error && <div className="mt-2 text-red-600 text-sm font-semibold">{error}</div>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              {isLoading ? "Sending..." : "Send Reset Email"}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <button onClick={handleBackToLogin} className="text-purple-700 hover:text-purple-800 font-bold text-sm">
              ← Back to Login
            </button>
          </div>

          {/* Additional Help */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Still having trouble?</p>
            <a href="#" className="text-purple-700 hover:text-purple-800 font-bold">
              Contact Support
            </a>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="bg-purple-100 text-center py-4 text-sm italic text-gray-700">
        "This platform transformed my learning experience!" — Rahul, Class 12
      </div>
    </div>
  )
}
