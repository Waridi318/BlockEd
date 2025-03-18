"use client"

import React, { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
import { ArrowRight, Star, Trophy, Gift, Lock, CheckCircle, Sparkles, Zap, Lightbulb, Shield } from "lucide-react"

// Custom Toast Implementation
interface ToastProps {
  title: string
  description: string
}

// Toast Context
interface ToastContextType {
  toast: (props: ToastProps) => void
}

const ToastContext = React.createContext<ToastContextType>({
  toast: () => {},
})

export const useToast = () => React.useContext(ToastContext)

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<(ToastProps & { id: number })[]>([])

  const addToast = (props: ToastProps) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { ...props, id }])

    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-black/80 backdrop-blur-xl border border-purple-500/30 rounded-lg p-4 shadow-lg max-w-md"
          >
            <h4 className="font-bold text-white">{toast.title}</h4>
            <p className="text-sm text-purple-200">{toast.description}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// Particle field component
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

// Game Card Interface
interface GameCardProps {
  title: string
  description: string
  icon: React.ReactNode
  color: string
  completed?: boolean
  locked?: boolean
  onClick: () => void
}

// Game Card Component
const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  icon,
  color,
  completed = false,
  locked = false,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  return (
    <div
      className={`relative rounded-xl overflow-hidden transition-all duration-300 transform
        ${locked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"} 
        ${isHovered && !locked ? "scale-105 -translate-y-2" : ""}`}
      onClick={locked ? undefined : onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20 blur-lg 
        ${isHovered ? "blur-xl" : ""}`}
      />
      <div
        className={`relative h-full p-6 backdrop-blur-xl rounded-xl border-2
          ${completed ? "border-purple-500" : locked ? "border-gray-700" : `border-purple-500/30 bg-gradient-to-br ${color} bg-opacity-20`}`}
      >
        <div className="flex items-center mb-4">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 
              ${completed ? "bg-purple-500" : locked ? "bg-gray-700" : `bg-gradient-to-br ${color}`}
              ${isHovered ? "rotate-12" : ""} transition-all duration-500`}
          >
            {locked ? <Lock className="w-6 h-6 text-white" /> : icon}
          </div>
          <h3 className="text-xl font-bold text-white">
            {title}
            {completed && (
              <span className="ml-2 inline-flex items-center">
                <Star className="w-4 h-4 text-purple-300" />
              </span>
            )}
          </h3>
        </div>
        <p className="text-gray-300 mb-4">{description}</p>
        <button
          className={`w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2 font-medium
            ${
              completed
                ? "bg-purple-500 text-white"
                : locked
                  ? "bg-gray-700 text-gray-400"
                  : `bg-gradient-to-r from-purple-600 to-blue-600 text-white`
            } transition-all duration-300`}
          disabled={locked}
        >
          <span>{completed ? "Play Again" : locked ? "Locked" : "Play Now"}</span>
          {!locked && <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
        </button>
      </div>
    </div>
  )
}

// Character Selection Component
interface CharacterProps {
  name: string
  image: string
  selected: boolean
  locked?: boolean
  onClick: () => void
}

const Character: React.FC<CharacterProps> = ({ name, image, selected, locked = false, onClick }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  return (
    <div
      className={`relative rounded-xl overflow-hidden transition-all duration-300
        ${locked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} 
        ${selected ? "ring-4 ring-purple-400 transform scale-105" : ""}
        ${isHovered && !locked && !selected ? "translate-y-[-8px]" : ""}`}
      onClick={locked ? undefined : onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 opacity-20" />
      <div className="relative p-4 backdrop-blur-md">
        <div className="mb-4 rounded-lg overflow-hidden aspect-square">
          <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
          {locked && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Lock className="w-8 h-8 text-white" />
            </div>
          )}
        </div>
        <h4 className="text-center font-medium text-white">{name}</h4>
        {selected && (
          <div className="absolute top-2 right-2 bg-purple-400 rounded-full p-1">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
    </div>
  )
}

// Simple Game Component
interface SimpleGameProps {
  onComplete: () => void
  onBack: () => void
}

const BlockchainGame: React.FC<SimpleGameProps> = ({ onComplete, onBack }) => {
  const [blocks, setBlocks] = useState<number[]>([])
  const [selectedBlocks, setSelectedBlocks] = useState<number[]>([])
  const [validated, setValidated] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Initialize the game with 5 blocks
    setBlocks([1, 2, 3, 4, 5])
  }, [])

  const handleBlockClick = (blockId: number) => {
    if (validated || gameCompleted) return

    // Toggle block selection
    if (selectedBlocks.includes(blockId)) {
      setSelectedBlocks(selectedBlocks.filter((id) => id !== blockId))
    } else {
      setSelectedBlocks([...selectedBlocks, blockId].sort((a, b) => a - b))
    }
  }

  const validateChain = () => {
    setValidated(true)

    // Simple game logic: if they selected all blocks in order, they win
    if (selectedBlocks.length === blocks.length && selectedBlocks.every((block, index) => block === blocks[index])) {
      setTimeout(() => {
        setGameCompleted(true)
        toast({
          title: "Chain Validated!",
          description: "You successfully created a valid blockchain! You earned a badge!",
        })
        setTimeout(() => {
          onComplete()
        }, 2000)
      }, 1500)
    } else {
      toast({
        title: "Try Again",
        description: "That's not quite right. Remember, blocks must connect in order!",
      })
      setTimeout(() => {
        setSelectedBlocks([])
        setValidated(false)
      }, 1500)
    }
  }

  return (
    <div className="relative bg-[#120A38]/60 backdrop-blur-md border-2 border-purple-700/30 rounded-xl p-6">
      <button onClick={onBack} className="inline-flex items-center text-purple-400 mb-6 group">
        <ArrowRight className="w-4 h-4 mr-2 transform rotate-180 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Games</span>
      </button>

      <h2 className="text-2xl font-bold text-center mb-6">Build Your Blockchain!</h2>
      <p className="text-center text-gray-300 mb-8">
        Click on the blocks in order (1-5) to create a valid blockchain. All blocks must be connected!
      </p>

      <div className="flex justify-center mb-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {blocks.map((blockId) => (
            <div
              key={blockId}
              onClick={() => handleBlockClick(blockId)}
              className={`relative w-20 h-20 rounded-lg flex items-center justify-center text-2xl font-bold cursor-pointer transition-all duration-300
                ${
                  selectedBlocks.includes(blockId)
                    ? validated
                      ? gameCompleted
                        ? "bg-purple-500 border-2 border-purple-300"
                        : "bg-purple-500 border-2 border-purple-300"
                      : "bg-purple-500 border-2 border-purple-300"
                    : "bg-[#1A0F4D] border-2 border-purple-900/50 hover:bg-[#231463]"
                }
                ${selectedBlocks.includes(blockId) && "transform scale-110"}`}
            >
              {blockId}
              {selectedBlocks.includes(blockId) && selectedBlocks.indexOf(blockId) > 0 && (
                <div
                  className={`absolute -left-8 top-1/2 w-8 h-1 
                    ${validated ? (gameCompleted ? "bg-purple-500" : "bg-purple-500") : "bg-purple-500"}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={validateChain}
          disabled={selectedBlocks.length !== blocks.length || validated}
          className={`px-8 py-4 rounded-xl font-bold transition-all duration-300
            ${
              selectedBlocks.length !== blocks.length || validated
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90"
            }`}
        >
          {gameCompleted ? "Blockchain Valid!" : validated ? "Validating..." : "Validate Chain"}
        </button>
      </div>
    </div>
  )
}

// Add the import for BlockchainConnect
import BlockchainConnect from "../components/BlockchainConnect"

// Main Page Component
const KidsPage: React.FC = () => {
  // const navigate = useNavigate()
  const [activeGame, setActiveGame] = useState<number | null>(null)
  const [completedGames, setCompletedGames] = useState<number[]>([])
  const [points, setPoints] = useState(0)
  const [selectedCharacter, setSelectedCharacter] = useState(0)
  const [showCharacterSelection, setShowCharacterSelection] = useState(false)
  // const [ocid, setOcid] = useState<string>("")
  const { toast } = useToast()
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  // Add these state variables to the KidsPage component
  const [walletConnected, setWalletConnected] = useState(false)
  const [userAddress, setUserAddress] = useState<string | null>(null)

  // Add a new state variable to control the wallet connection popup visibility:
  const [showWalletConnect, setShowWalletConnect] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Load saved data from localStorage
    const savedData = localStorage.getItem("kidsBlockchainData")
    if (savedData) {
      const { completed, userPoints, character } = JSON.parse(savedData)
      setCompletedGames(completed || [])
      setPoints(userPoints || 0)
      setSelectedCharacter(character || 0)
    }

    // Generate a random OCID for content tracking
    // const generateRandomOcid = () => {
    //   const characters = "0123456789abcdef"
    //   let result = "0x"
    //   for (let i = 0; i < 40; i++) {
    //     result += characters.charAt(Math.floor(Math.random() * characters.length))
    //   }
    //   setOcid(result)
    // }

    // generateRandomOcid()

    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Add these handler functions
  const handleWalletConnect = (address: string) => {
    setWalletConnected(true)
    setUserAddress(address)

    toast({
      title: "Wallet Connected!",
      description: `Connected to ${address.substring(0, 6)}...${address.substring(address.length - 4)}`,
    })
  }

  const handleUserRegister = (name: string) => {
    toast({
      title: "Registration Successful!",
      description: `Welcome to Blockchain Adventures, ${name}!`,
    })
  }

  const handleGameComplete = () => {
    if (activeGame !== null && !completedGames.includes(activeGame)) {
      // Add points
      const newPoints = points + 50
      setPoints(newPoints)

      // Mark game as completed
      const newCompletedGames = [...completedGames, activeGame]
      setCompletedGames(newCompletedGames)

      // Save progress to localStorage
      localStorage.setItem(
        "kidsBlockchainData",
        JSON.stringify({
          completed: newCompletedGames,
          userPoints: newPoints,
          character: selectedCharacter,
        }),
      )

      // Generate NFT badge notification
      setTimeout(() => {
        toast({
          title: "New Badge Earned!",
          description: "You earned a blockchain explorer badge! It's been added to your collection.",
        })
      }, 1000)
    }

    // Return to game selection
    setTimeout(() => {
      setActiveGame(null)
    }, 2000)
  }

  const handleCharacterSelect = (index: number) => {
    setSelectedCharacter(index)

    // Save to localStorage
    localStorage.setItem(
      "kidsBlockchainData",
      JSON.stringify({
        completed: completedGames,
        userPoints: points,
        character: index,
      }),
    )

    toast({
      title: "Character Selected!",
      description: `You've chosen ${characters[index].name} as your blockchain guide!`,
    })

    setTimeout(() => {
      setShowCharacterSelection(false)
    }, 1000)
  }

  const games = [
    {
      title: "Build a Blockchain",
      description: "Connect blocks together to create your own blockchain!",
      icon: <Sparkles className="w-6 h-6 text-white" />,
      color: "from-purple-700 to-purple-500",
    },
    {
      title: "Crypto Collector",
      description: "Collect digital coins while learning about cryptocurrencies!",
      icon: <Star className="w-6 h-6 text-white" />,
      color: "from-purple-800 to-purple-600",
    },
    {
      title: "Decentralized Heroes",
      description: "Help the heroes protect the network from hackers!",
      icon: <Trophy className="w-6 h-6 text-white" />,
      color: "from-purple-900 to-purple-700",
    },
    {
      title: "NFT Creator",
      description: "Design your own NFT artwork and learn how they work!",
      icon: <Gift className="w-6 h-6 text-white" />,
      color: "from-purple-600 to-purple-400",
    },
  ]

  const characters = [
    {
      name: "Blocky",
      image: "/placeholder.svg?height=150&width=150",
      locked: false,
    },
    {
      name: "Crypto",
      image: "/placeholder.svg?height=150&width=150",
      locked: false,
    },
    {
      name: "Decentrala",
      image: "/placeholder.svg?height=150&width=150",
      locked: points < 100,
    },
    {
      name: "Tokenmaster",
      image: "/placeholder.svg?height=150&width=150",
      locked: points < 200,
    },
  ]

  const blockchainFacts = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Blocks Are Like Puzzle Pieces",
      description: "Each block connects to the one before it, creating a chain that can't be broken!",
      color: "from-purple-600 to-blue-600",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Super Secure",
      description: "Blockchain uses special codes that make it almost impossible for bad guys to change information.",
      color: "from-purple-700 to-purple-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Digital Treasures",
      description: "You can collect digital items called NFTs that are truly yours - just like real treasures!",
      color: "from-purple-800 to-purple-600",
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
      <div className="pt-24 pb-10 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <a href="/" className="inline-flex items-center text-purple-300 mb-6 group">
            <ArrowRight className="w-5 h-5 mr-2 transform rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </a>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div
              className={`transition-all duration-1000 delay-300 
              ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <div className="overflow-hidden">
                  <span className="inline-block animate-slide-up-fade">Blockchain</span>
                </div>
                <div className="overflow-hidden">
                  <span className="inline-block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-slide-up-fade delay-200">
                    Adventures
                  </span>
                </div>
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl opacity-0 animate-fade-in delay-700">
                Join the fun and learn about blockchain through exciting games and activities!
              </p>
            </div>

            {/* Update the header profile card to use dark purple background */}
            <div className="mt-6 md:mt-0 flex items-center bg-[#120A38]/60 backdrop-blur-md rounded-xl p-3 border border-purple-700/30">
              <div className="mr-4 relative">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-purple-400">
                  <img
                    src={characters[selectedCharacter].image || "/placeholder.svg"}
                    alt="Character"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => setShowCharacterSelection(true)}
                  className="absolute -bottom-2 -right-2 bg-purple-500 rounded-full p-1"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                </button>
              </div>
              <div>
                <p className="text-xs text-purple-200">Your Guide</p>
                <p className="font-bold text-white">{characters[selectedCharacter].name}</p>
                <div className="flex items-center mt-1">
                  <Star className="w-4 h-4 text-purple-400 mr-1" />
                  <span className="text-purple-100">{points} points</span>
                </div>
              </div>
            </div>
          </div>
{/* 
          {ocid && (
            <div className="mb-6 inline-block bg-[#120A38]/60 backdrop-blur-md border border-purple-700/30 rounded-xl p-3">
              <p className="text-xs text-purple-200">
                Content OCID:{" "}
                <span className="font-mono text-purple-200">
                  {ocid.slice(0, 10)}...{ocid.slice(-6)}
                </span>
              </p>
            </div>
          )} */}

          {completedGames.length > 0 && (
            <div className="bg-[#120A38]/60 backdrop-blur-md rounded-xl p-4 border border-purple-700/30 mb-8 inline-block">
              <div className="flex items-center">
                <Trophy className="w-6 h-6 text-purple-400 mr-3" />
                <div>
                  <h3 className="font-bold text-white">Badges Earned: {completedGames.length}</h3>
                  <p className="text-sm text-purple-200">Collect all badges to become a Blockchain Master!</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {showCharacterSelection ? (
            <div className="bg-[#120A38]/60 backdrop-blur-md rounded-2xl border border-purple-700/30 p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Choose Your Guide</h2>
                <button
                  onClick={() => setShowCharacterSelection(false)}
                  className="text-purple-300 hover:text-white transition-colors"
                >
                  <ArrowRight className="w-5 h-5 transform rotate-180" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {characters.map((character, index) => (
                  <Character
                    key={index}
                    name={character.name}
                    image={character.image}
                    selected={selectedCharacter === index}
                    locked={character.locked}
                    onClick={() => handleCharacterSelect(index)}
                  />
                ))}
              </div>

              {characters.some((char) => char.locked) && (
                <p className="text-center text-purple-200 mt-6 text-sm">Earn more points to unlock all characters!</p>
              )}
            </div>
          ) : activeGame === null ? (
            <>
              {/* Blockchain Facts Section */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Blockchain Fun Facts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {blockchainFacts.map((fact, index) => (
                    <div key={index} className="relative group">
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-purple-800/20 rounded-xl blur-lg 
                        group-hover:blur-xl transition-all duration-300"
                      />
                      <div
                        className="relative bg-[#120A38]/60 backdrop-blur-md rounded-xl border border-purple-700/30 
                        group-hover:border-purple-600/50 p-6 h-full transform group-hover:translate-y-[-8px] 
                        transition-all duration-300"
                      >
                        <div
                          className={`w-14 h-14 mb-6 rounded-xl bg-gradient-to-r ${fact.color} 
                          flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500`}
                        >
                          {fact.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-white">{fact.title}</h3>
                        <p className="text-gray-300 group-hover:text-gray-200 transition-colors">{fact.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add this to the JSX, right before the game cards section */}
              {!activeGame && !showCharacterSelection && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Blockchain Wallet
                  </h2>

                  {walletConnected ? (
                    <div className="bg-[#120A38]/60 backdrop-blur-md rounded-xl p-6 border-2 border-purple-700/30">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mr-3">
                          <span className="text-white font-bold">W</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-white">Wallet Connected</h3>
                          <p className="text-sm text-purple-200">
                            {userAddress?.substring(0, 6)}...{userAddress?.substring(userAddress?.length - 4)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <button
                        onClick={() => setShowWalletConnect((prev) => !prev)}
                        className="group relative px-8 py-4 rounded-xl overflow-hidden cursor-pointer"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600" />
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 blur-xl 
                          group-hover:blur-2xl transition-all duration-300"
                        />
                        <div className="relative z-10 flex items-center space-x-2">
                          <span>Connect Blockchain Wallet</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>

                      {showWalletConnect && (
                        <div className="mt-6">
                          <BlockchainConnect onConnect={handleWalletConnect} onRegister={handleUserRegister} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Blockchain Games
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {games.map((game, index) => (
                  <GameCard
                    key={index}
                    title={game.title}
                    description={game.description}
                    icon={game.icon}
                    color={game.color}
                    completed={completedGames.includes(index)}
                    locked={index > 1 && completedGames.length < 1}
                    onClick={() => setActiveGame(index)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="max-w-4xl mx-auto">
              {/* We're only implementing the first game for this example */}
              {activeGame === 0 ? (
                <BlockchainGame onComplete={handleGameComplete} onBack={() => setActiveGame(null)} />
              ) : (
                <div className="text-center bg-[#120A38]/60 backdrop-blur-md rounded-2xl border border-purple-700/30 p-12">
                  <button
                    onClick={() => setActiveGame(null)}
                    className="inline-flex items-center text-purple-300 mb-8 group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 transform rotate-180 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Games</span>
                  </button>

                  <h2 className="text-2xl font-bold mb-4">{games[activeGame].title}</h2>
                  <p className="text-gray-200 mb-8">This game is under construction! Please check back soon.</p>

                  <div className="flex justify-center">
                    <div className="animate-bounce bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full">
                      {games[activeGame].icon}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <div className="py-12 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-blue-900/10 backdrop-blur-sm" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Ready for More Blockchain Fun?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Complete games to earn badges and unlock new characters for your blockchain adventures!
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group relative px-8 py-4 rounded-xl overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600" />
              <div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 blur-xl 
                group-hover:blur-2xl transition-all duration-300"
              />
              <div className="relative z-10 flex items-center space-x-2">
                <span>Back to Top</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          <div className="border-t border-purple-500/20 mt-12 pt-8 text-center">
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

export default KidsPage

