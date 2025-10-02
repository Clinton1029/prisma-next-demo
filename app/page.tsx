"use client"
import { useState, useEffect } from "react"

export default function Home() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState("")
  const [message, setMessage] = useState("")

  // Load token from localStorage if it exists
  useEffect(() => {
    const savedToken = localStorage.getItem("token")
    if (savedToken) setToken(savedToken)
  }, [])

  const register = async () => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok) {
        setMessage("✅ Registered successfully, now login.")
      } else {
        setMessage("❌ " + (data.message || "Registration failed"))
      }
    } catch (err) {
      setMessage("❌ Error registering user")
    }
  }

  const login = async () => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (data.token) {
        setToken(data.token)
        localStorage.setItem("token", data.token) // persist token
        setMessage("✅ Logged in successfully")
      } else {
        setMessage("❌ " + (data.message || "Login failed"))
      }
    } catch (err) {
      setMessage("❌ Error logging in")
    }
  }

  const checkProtected = async () => {
    if (!token) {
      setMessage("⚠️ Please login first")
      return
    }
    try {
      const res = await fetch("/api/protected", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setMessage(JSON.stringify(data))
    } catch (err) {
      setMessage("❌ Error accessing protected route")
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-2xl p-8 w-[400px] border border-white/20">
        <h1 className="text-3xl font-extrabold text-white mb-6 text-center">
          🔐 Prisma + Next.js <span className="text-indigo-400">JWT Auth</span>
        </h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-3 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <div className="flex gap-2">
          <button
            onClick={register}
            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 text-white font-semibold py-2 rounded-lg shadow-lg"
          >
            Register
          </button>
          <button
            onClick={login}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-200 text-white font-semibold py-2 rounded-lg shadow-lg"
          >
            Login
          </button>
          <button
            onClick={checkProtected}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 transition-all duration-200 text-white font-semibold py-2 rounded-lg shadow-lg"
          >
            Check
          </button>
        </div>

        {message && (
          <p
            className={`mt-6 text-center text-sm ${
              message.startsWith("✅")
                ? "text-green-400"
                : message.startsWith("❌")
                ? "text-red-400"
                : "text-yellow-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </main>
  )
}
