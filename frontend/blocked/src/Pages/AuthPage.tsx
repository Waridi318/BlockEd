"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowRight, Mail, Lock, Wallet, User, ChevronRight, X } from "lucide-react"

// Particle field component (reused from KidsPage)
const ParticleField: React.FC = () => {
  return (
    <div className="fixed inset-0 opacity-50">
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            width: `${Math.random() * 6 + 1}px`,
            height: `${Math.random() * 6 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            background: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100}, 255, 0.8)`,
            animationDuration: `${Math.random() * 15 + 10}s`,
            animationDelay: `-${Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  )
}

// Auth Option Card Component
interface AuthOptionProps {
  title: string
  description: string
  icon: React.ReactNode
  onClick: () => void
  primary?: boolean
}

const AuthOption: React.FC<AuthOptionProps> = ({ title, description, icon, onClick, primary = false }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`relative rounded-xl overflow-hidden transition-all duration-300 transform cursor-pointer
        ${isHovered ? "scale-105 -translate-y-2" : ""}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute inset-0 ${
          primary ? "bg-gradient-to-br from-purple-600 to-blue-600" : "bg-gradient-to-br from-purple-900 to-purple-700"
        } opacity-20 blur-lg ${isHovered ? "blur-xl" : ""}`}
      />
      <div
        className={`relative h-full p-6 backdrop-blur-xl rounded-xl border-2
          border-purple-500/30 bg-[#120A38]/60`}
      >
        <div className="flex items-center mb-4">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 
              ${
                primary
                  ? "bg-gradient-to-br from-purple-600 to-blue-600"
                  : "bg-gradient-to-br from-purple-800 to-purple-600"
              }
              ${isHovered ? "rotate-12" : ""} transition-all duration-500`}
          >
            {icon}
          </div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-gray-300 mb-4">{description}</p>
        <div
          className={`w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2 font-medium
            ${
              primary
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                : "bg-white/10 backdrop-blur-md text-white border border-white/20"
            } transition-all duration-300`}
        >
          <span>Continue</span>
          <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  )
}

// Main Auth Page Component
const AuthPage: React.FC = () => {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [name, setName] = useState("")

  useEffect(() => {
    setIsVisible(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)

    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleWalletConnect = () => {
    // Implement wallet connection logic
    console.log("Connecting wallet...")
    // After successful connection, navigate to main page
    setTimeout(() => navigate("/"), 1500)
  }

  const handleGoogleSignIn = () => {
    // Implement Google sign-in logic
    console.log("Signing in with Google...")
    // After successful sign-in, navigate to main page
    setTimeout(() => navigate("/"), 1500)
  }

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement email authentication logic
    console.log("Email auth:", { email, password, isSignUp, name })
    // After successful auth, navigate to main page
    setTimeout(() => navigate("/"), 1500)
  }

  return (
    <div className="min-h-screen bg-[#050314] text-white overflow-hidden">
      <ParticleField />

      {/* Dynamic Cursor Effect */}
      <div
        className="fixed w-64 h-64 pointer-events-none z-50 transition-transform duration-100"
        style={{
          transform: `translate(${mousePosition.x - 128}px, ${mousePosition.y - 128}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />

        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-10">
            <div
              className={`transition-all duration-1000 delay-300 
              ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
            >
              <h1 className="text-4xl font-bold mb-4">
                <div className="overflow-hidden">
                  <span className="inline-block animate-slide-up-fade">Blockchain</span>
                </div>
                <div className="overflow-hidden">
                  <span className="inline-block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-slide-up-fade delay-200">
                    Adventures
                  </span>
                </div>
              </h1>
              <p className="text-xl text-purple-200 max-w-md mx-auto opacity-0 animate-fade-in delay-700">
                Join the fun and learn about blockchain!
              </p>
            </div>
          </div>

          {showEmailForm ? (
            <div className="bg-[#120A38]/60 backdrop-blur-md rounded-2xl border-2 border-purple-700/30 p-6 mb-8 animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{isSignUp ? "Create Account" : "Welcome Back"}</h2>
                <button
                  onClick={() => setShowEmailForm(false)}
                  className="text-purple-300 hover:text-white transition-colors p-1 rounded-full hover:bg-purple-800/30"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleEmailAuth} className="space-y-4">
                {isSignUp && (
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-purple-200">
                      Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-purple-400" />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-[#0A0627]/80 border border-purple-700/30 text-white block w-full pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-purple-200">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-purple-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-[#0A0627]/80 border border-purple-700/30 text-white block w-full pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-purple-200">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-purple-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-[#0A0627]/80 border border-purple-700/30 text-white block w-full pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="group relative w-full px-4 py-3 rounded-xl overflow-hidden cursor-pointer mt-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <span className="relative z-10 flex items-center justify-center">
                    {isSignUp ? "Create Account" : "Sign In"}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-purple-300 hover:text-white text-sm transition-colors"
                >
                  {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <AuthOption
                title="Connect Wallet"
                description="Use your blockchain wallet to sign in securely"
                icon={<Wallet className="w-6 h-6 text-white" />}
                onClick={handleWalletConnect}
                primary
              />

              <AuthOption
                title="Sign in with Google"
                description="Use your Google account for quick access"
                icon={
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path
                      fill="#ffffff"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#ffffff"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#ffffff"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    />
                    <path
                      fill="#ffffff"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                }
                onClick={handleGoogleSignIn}
              />

              <div className="relative flex items-center justify-center my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-purple-700/30"></div>
                </div>
                <div className="relative px-4 bg-[#050314] text-sm text-purple-300">Or continue with</div>
              </div>

              <button
                onClick={() => setShowEmailForm(true)}
                className="w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2 font-medium
                  bg-[#120A38]/60 backdrop-blur-md border border-purple-700/30 text-white hover:bg-[#1A0F4D]/60 transition-all duration-300"
              >
                <Mail className="w-5 h-5 mr-2" />
                <span>Email and Password</span>
              </button>
            </div>
          )}

          <div className="mt-8 text-center">
            <a href="/" className="inline-flex items-center text-purple-300 group">
              <ArrowRight className="w-4 h-4 mr-2 transform rotate-180 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </a>
          </div>
        </div>

        <div className="relative z-10 mt-16 text-center">
          <p className="text-purple-300 text-sm">© 2025 EduChain. All rights reserved.</p>
          <p className="text-gray-500 text-xs mt-2">
            A fun and educational platform for kids to learn about blockchain technology.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthPage

