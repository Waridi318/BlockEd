"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Wallet,
  Blocks,
  Trophy,
  Shield,
  Sparkles,
  Lightbulb,
  Zap,
  Gift,
  HelpCircle,
  Check,
} from "lucide-react"

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

// Step Card Component
interface StepCardProps {
  title: string
  description: React.ReactNode
  icon: React.ReactNode
  image?: string
  isActive: boolean
}

const StepCard: React.FC<StepCardProps> = ({ title, description, icon, image, isActive }) => {
  return (
    <div
      className={`bg-[#120A38]/60 backdrop-blur-md rounded-2xl border-2 
        ${isActive ? "border-purple-500" : "border-purple-700/30"} 
        p-6 transition-all duration-500 transform
        ${isActive ? "scale-100 opacity-100" : "scale-95 opacity-0 absolute pointer-events-none"}
      `}
    >
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mr-4">
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>

      {image && (
        <div className="mb-6 rounded-xl overflow-hidden">
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-auto object-cover" />
        </div>
      )}

      <div className="text-gray-200 space-y-4">{description}</div>
    </div>
  )
}

// Blockchain Term Component
interface BlockchainTermProps {
  term: string
  definition: string
  icon: React.ReactNode
}

const BlockchainTerm: React.FC<BlockchainTermProps> = ({ term, definition, icon }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div
        className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-purple-800/20 rounded-xl blur-lg 
        group-hover:blur-xl transition-all duration-300"
      />
      <div
        className="relative bg-[#120A38]/60 backdrop-blur-md rounded-xl border border-purple-700/30 
        group-hover:border-purple-600/50 p-4 h-full transform group-hover:translate-y-[-8px] 
        transition-all duration-300"
      >
        <div
          className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600
          flex items-center justify-center transform ${isHovered ? "rotate-12" : ""} transition-all duration-500`}
        >
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2 text-white">{term}</h3>
        <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors">{definition}</p>
      </div>
    </div>
  )
}

// Progress Indicator Component
interface ProgressIndicatorProps {
  totalSteps: number
  currentStep: number
  onStepClick: (step: number) => void
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ totalSteps, currentStep, onStepClick }) => {
  return (
    <div className="flex items-center justify-center space-x-2 mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <button
          key={index}
          onClick={() => onStepClick(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 
            ${
              currentStep === index
                ? "bg-gradient-to-r from-purple-500 to-blue-500 w-6"
                : index < currentStep
                  ? "bg-purple-500"
                  : "bg-purple-800/50"
            }`}
          aria-label={`Go to step ${index + 1}`}
        />
      ))}
    </div>
  )
}

// Main Onboarding Page Component
const OnboardingPage: React.FC = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [showWalletDemo, setShowWalletDemo] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)

  const totalSteps = 5

  useEffect(() => {
    setIsVisible(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)

    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Navigate to main page when finished
      navigate("/")
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleWalletDemo = () => {
    setShowWalletDemo(true)
    setTimeout(() => {
      setWalletConnected(true)
    }, 1500)
  }

  // Define the steps content
  const steps = [
    {
      title: "Welcome to BlockEd!",
      icon: <Sparkles className="w-6 h-6 text-white" />,
      image: "/placeholder.svg?height=200&width=500",
      description: (
        <>
          <p>
            Welcome to an exciting journey into the world of blockchain! This is a fun and educational platform where
            you can:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Learn about blockchain technology through games</li>
            <li>Collect digital badges as you complete challenges</li>
            <li>Create your own digital wallet</li>
            <li>Explore the future of the internet!</li>
          </ul>
          <p className="mt-4">Let's get started with a quick tour of what blockchain is and how to use our platform!</p>
        </>
      ),
    },
    {
      title: "What is Blockchain?",
      icon: <Blocks className="w-6 h-6 text-white" />,
      image: "/placeholder.svg?height=200&width=500",
      description: (
        <>
          <p>Blockchain is like a digital record book that everyone can see, but no one person controls.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <BlockchainTerm
              term="Blocks"
              definition="Packages of information linked together in a chain"
              icon={<Blocks className="w-5 h-5 text-white" />}
            />
            <BlockchainTerm
              term="Decentralized"
              definition="Not controlled by one person or company"
              icon={<Zap className="w-5 h-5 text-white" />}
            />
            <BlockchainTerm
              term="Secure"
              definition="Protected by special codes that are very hard to break"
              icon={<Shield className="w-5 h-5 text-white" />}
            />
          </div>
          <p>
            Think of blockchain like a digital treasure chest that keeps track of who owns what. It's the technology
            behind cryptocurrencies like Bitcoin and digital collectibles called NFTs!
          </p>
        </>
      ),
    },
    {
      title: "Connecting Your Wallet",
      icon: <Wallet className="w-6 h-6 text-white" />,
      description: (
        <>
          <p>
            A blockchain wallet is like a digital backpack that holds your digital items and badges. Here's how to
            connect yours:
          </p>

          <div className="my-6 bg-[#0A0627]/80 rounded-xl p-4 border border-purple-700/30">
            <h3 className="font-bold mb-2 text-purple-300">How to Connect:</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Click the "Connect Wallet" button on our homepage</li>
              <li>If you don't have a wallet yet, you can create one (with parent's help)</li>
              <li>Follow the instructions to connect your wallet to our site</li>
              <li>Once connected, you'll see your wallet address at the top of the page</li>
            </ol>
          </div>

          {!showWalletDemo ? (
            <div className="text-center mt-6">
              <button
                onClick={handleWalletDemo}
                className="group relative px-6 py-3 rounded-xl overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600" />
                <div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 blur-xl 
                  group-hover:blur-2xl transition-all duration-300"
                />
                <div className="relative z-10 flex items-center justify-center space-x-2">
                  <Wallet className="w-5 h-5" />
                  <span>Try Connecting a Wallet</span>
                </div>
              </button>
            </div>
          ) : (
            <div className="mt-6 bg-[#120A38]/80 backdrop-blur-md rounded-xl p-4 border-2 border-purple-700/30 transition-all duration-500">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mr-3">
                  {walletConnected ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <Wallet className="w-5 h-5 text-white animate-pulse" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-white">
                    {walletConnected ? "Wallet Connected!" : "Connecting Wallet..."}
                  </h3>
                  {walletConnected && <p className="text-sm text-purple-200">0x71C...93F4</p>}
                </div>
              </div>
            </div>
          )}

          <p className="mt-6">
            <strong className="text-purple-300">Remember:</strong> Always ask a parent or guardian for help when
            connecting a wallet for the first time!
          </p>
        </>
      ),
    },
    {
      title: "Playing Games & Earning Badges",
      icon: <Trophy className="w-6 h-6 text-white" />,
      image: "/placeholder.svg?height=200&width=500",
      description: (
        <>
          <p>Our platform has fun games that teach you about blockchain while you play!</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-[#0A0627]/80 rounded-xl p-4 border border-purple-700/30">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-700 to-purple-500 flex items-center justify-center mr-3">
                  <Blocks className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-white">Build a Blockchain</h3>
              </div>
              <p className="text-sm text-gray-300">Connect blocks in the right order to create your own blockchain!</p>
            </div>

            <div className="bg-[#0A0627]/80 rounded-xl p-4 border border-purple-700/30">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-800 to-purple-600 flex items-center justify-center mr-3">
                  <Gift className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-white">NFT Creator</h3>
              </div>
              <p className="text-sm text-gray-300">Design your own digital collectibles and learn how NFTs work!</p>
            </div>
          </div>

          <div className="bg-[#0A0627]/80 rounded-xl p-4 border border-purple-700/30 mb-6">
            <h3 className="font-bold mb-2 text-purple-300">Earning Badges:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Complete games to earn special blockchain badges</li>
              <li>Badges are stored in your wallet as digital collectibles</li>
              <li>Collect all badges to become a Blockchain Master!</li>
              <li>Show off your badges to friends and family</li>
            </ul>
          </div>

          <p>The more you play, the more you'll learn about blockchain technology and how it works!</p>
        </>
      ),
    },
    {
      title: "Ready to Start Your Adventure?",
      icon: <Lightbulb className="w-6 h-6 text-white" />,
      description: (
        <>
          <p>You're all set to begin your blockchain adventure! Here's a quick recap:</p>

          <div className="my-6 space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <span className="text-white font-bold">1</span>
              </div>
              <p>Blockchain is a digital record book that's secure and not controlled by one person</p>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <span className="text-white font-bold">2</span>
              </div>
              <p>Connect your wallet (with parent's help) to store your badges and track your progress</p>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <span className="text-white font-bold">3</span>
              </div>
              <p>Play games to learn about blockchain and earn special digital badges</p>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <span className="text-white font-bold">4</span>
              </div>
              <p>Have fun while learning about the technology that's changing the world!</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/")}
              className="group relative px-8 py-4 rounded-xl overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600" />
              <div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 blur-xl 
                group-hover:blur-2xl transition-all duration-300"
              />
              <div className="relative z-10 flex items-center justify-center space-x-2">
                <span className="font-bold">Start My Adventure!</span>
                <Sparkles className="w-5 h-5 ml-2" />
              </div>
            </button>
          </div>

          <p className="text-center mt-6 text-sm text-purple-300">
            Remember: If you ever need help, click the <HelpCircle className="w-4 h-4 inline" /> icon on any page!
          </p>
        </>
      ),
    },
  ]

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

      {/* Header */}
      <div className="pt-16 pb-8 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div
            className={`transition-all duration-1000 delay-300 text-center
            ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <div className="overflow-hidden">
                <span className="inline-block animate-slide-up-fade">Getting Started with</span>
              </div>
              <div className="overflow-hidden">
                <span className="inline-block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-slide-up-fade delay-200">
                  Blockchain Adventures
                </span>
              </div>
            </h1>
            <p className="text-lg text-purple-200 max-w-2xl mx-auto opacity-0 animate-fade-in delay-700">
              Your guide to understanding blockchain and using our platform
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <ProgressIndicator totalSteps={totalSteps} currentStep={currentStep} onStepClick={setCurrentStep} />

          <div className="relative min-h-[500px]">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                title={step.title}
                description={step.description}
                icon={step.icon}
                image={step.image}
                isActive={currentStep === index}
              />
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              className={`group relative px-6 py-3 rounded-xl overflow-hidden cursor-pointer
                ${currentStep === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={currentStep === 0}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-purple-600" />
              <div
                className="absolute inset-0 bg-gradient-to-r from-purple-800 to-purple-600 blur-xl 
                group-hover:blur-2xl transition-all duration-300"
              />
              <div className="relative z-10 flex items-center justify-center space-x-2">
                <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
                <span>Previous</span>
              </div>
            </button>

            <button onClick={nextStep} className="group relative px-6 py-3 rounded-xl overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600" />
              <div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 blur-xl 
                group-hover:blur-2xl transition-all duration-300"
              />
              <div className="relative z-10 flex items-center justify-center space-x-2">
                <span>{currentStep === totalSteps - 1 ? "Finish" : "Next"}</span>
                <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-8 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-blue-900/10 backdrop-blur-sm" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <a href="/" className="inline-flex items-center text-purple-300 group">
            <ArrowRight className="w-4 h-4 mr-2 transform rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span>Skip tutorial and go to Home</span>
          </a>

          <div className="mt-6">
            <p className="text-purple-300 text-sm">© 2025 EduChain. All rights reserved.</p>
            <p className="text-gray-500 text-xs mt-2">
              A fun and educational platform for kids to learn about blockchain technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage

