import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { doSignInWithEmailAndPassword, doSignInWithGoogle, doCreateUserWithEmailAndPassword } from "../firebase/auth"
import { useAuth } from "../contexts/authContext"
import { sendPasswordResetEmail } from "firebase/auth"
import { db } from "../firebase/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"

export default function LoginPage() {
  const handleForgetPassword = (e) => {
    e.preventDefault();
    navigate("/forgetpass")
  }
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      if (isLogin) {
        await doSignInWithEmailAndPassword(formData.email, formData.password)
        navigate("/home")
        // Optionally redirect or show success
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match.")
          return
        }
        const userCredential = await doCreateUserWithEmailAndPassword(formData.email, formData.password)
        await setDoc(doc(db, "users", userCredential.user.uid), {
          name: formData.name,
          email: formData.email,
        })
        navigate("/select")
        // Optionally update profile with name
      }
    } catch (err) {
      // Customize error messages based on Firebase error codes
      switch (err.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          setError("Incorrect email or password.")
          break
        case "auth/invalid-email":
          setError("Please enter a valid email address.")
          break
        case "auth/email-already-in-use":
          setError("This email is already registered. Try logging in.")
          break
        case "auth/weak-password":
          setError("Password should be at least 6 characters.")
          break
        case "auth/missing-password":
          setError("Please enter your password.")
          break
        default:
          setError("An unexpected error occurred. Please try again.")
      }
    }
  }

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await doSignInWithGoogle();
      const user = result.user;
      // Check if user already exists in Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          name: user.displayName,
          email: user.email,
        });
        navigate("/select")
      } else if (userDoc.data().class && userDoc.data().stream) {
        navigate("/home")
      } else {
        navigate("/select")
      }  
      
    } catch (err) {
      switch (err.code) {
        case "auth/popup-closed-by-user":
          setError("Google sign-in was cancelled.");
          break;
        case "auth/cancelled-popup-request":
          setError("Cancelled previous Google sign-in request.");
          break;
        default:
          setError("Google sign-in failed. Please try again.");
      }
    }
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
          {/* Toggle Buttons */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md font-bold transition-colors ${
                isLogin ? "bg-purple-800 text-white" : "text-gray-700 hover:text-purple-700"
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md font-bold transition-colors ${
                !isLogin ? "bg-purple-800 text-white" : "text-gray-700 hover:text-purple-700"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form Title */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-purple-800 mb-2">{isLogin ? "Welcome Back!" : "Join Us Today!"}</h1>
            <p className="text-sm text-gray-600">
              {isLogin ? "Continue your learning journey" : "Start your educational adventure"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-transparent"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
              {/* Error message below password box */}
              {error && (
                <div className="mt-2 text-red-600 text-sm font-semibold">{error}</div>
              )}
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-transparent"
                  placeholder="Confirm your password"
                  required={!isLogin}
                />
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <a href="#" className="text-purple-700 hover:text-purple-800 font-bold" onClick={handleForgetPassword}>
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              {isLogin ? "Log In" : "Sign Up"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-600">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button
              className="w-full border border-gray-300 text-gray-700 font-bold py-2 px-6 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={handleGoogleSignIn}
            >
              Continue with Google
            </button>
          </div>

          {/* Footer Text */}
          <div className="mt-6 text-center text-sm text-gray-600">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <button onClick={() => setIsLogin(false)} className="text-purple-700 hover:text-purple-800 font-bold">
                  Sign up here
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button onClick={() => setIsLogin(true)} className="text-purple-700 hover:text-purple-800 font-bold">
                  Log in here
                </button>
              </>
            )}
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