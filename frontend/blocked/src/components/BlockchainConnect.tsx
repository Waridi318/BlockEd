"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ArrowRight, Shield } from "lucide-react"
import { registerUser, completeLesson, getUserData } from "../utils/contract"

interface BlockchainConnectProps {
  onConnect: (address: string) => void
  onRegister: (name: string) => void
}

const BlockchainConnect: React.FC<BlockchainConnectProps> = ({ onConnect, onRegister }) => {
  const [isConnecting, setIsConnecting] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [userName, setUserName] = useState("")
  const [isRegistered, setIsRegistered] = useState(false)
  const [userData, setUserData] = useState<{
    name: string
    lessonsCompleted: number
    certified: boolean
  } | null>(null)

  useEffect(() => {
    // Check if already connected
    const checkConnection = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" })
          if (accounts.length > 0) {
            setAddress(accounts[0])
            onConnect(accounts[0])

            // Check if user is registered
            const data = await getUserData(accounts[0])
            if (data && data.name) {
              setIsRegistered(true)
              setUserData(data)
            }
          }
        } catch (error) {
          console.error("Error checking connection:", error)
        }
      }
    }

    checkConnection()
  }, [onConnect])

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("Please install MetaMask to use this feature")
      return
    }

    setIsConnecting(true)
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      setAddress(accounts[0])
      onConnect(accounts[0])

      // Check if user is registered
      const data = await getUserData(accounts[0])
      if (data && data.name) {
        setIsRegistered(true)
        setUserData(data)
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleRegister = async () => {
    if (!userName.trim()) {
      alert("Please enter a name")
      return
    }

    try {
      const success = await registerUser(userName)
      if (success) {
        setIsRegistered(true)
        onRegister(userName)

        // Refresh user data
        if (address) {
          const data = await getUserData(address)
          if (data) {
            setUserData(data)
          }
        }
      }
    } catch (error) {
      console.error("Error registering:", error)
    }
  }

  const handleCompleteLesson = async () => {
    try {
      const success = await completeLesson()
      if (success && address) {
        // Refresh user data
        const data = await getUserData(address)
        if (data) {
          setUserData(data)
        }
      }
    } catch (error) {
      console.error("Error completing lesson:", error)
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-purple-500/30">
      <h2 className="text-2xl font-bold mb-4">Blockchain Connection</h2>

      {!address ? (
        <div>
          <p className="text-gray-300 mb-4">Connect your wallet to track your progress on the blockchain!</p>
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium flex items-center justify-center"
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
            {!isConnecting && <ArrowRight className="w-4 h-4 ml-2" />}
          </button>
        </div>
      ) : !isRegistered ? (
        <div>
          <p className="text-gray-300 mb-4">Your wallet is connected! Register to start tracking your progress.</p>
          <div className="mb-4">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 rounded-lg bg-white/10 border border-purple-500/30 text-white"
            />
          </div>
          <button
            onClick={handleRegister}
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium flex items-center justify-center"
          >
            Register
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 text-purple-400 mr-2" />
            <p className="text-white font-medium">
              Welcome back, <span className="text-purple-300">{userData?.name}</span>!
            </p>
          </div>

          <div className="bg-white/5 rounded-lg p-4 mb-4">
            <p className="text-gray-300">
              Lessons Completed: <span className="text-purple-300 font-bold">{userData?.lessonsCompleted}</span>
            </p>
            <p className="text-gray-300">
              Certification Status:{" "}
              {userData?.certified ? (
                <span className="text-green-400 font-bold">Certified</span>
              ) : (
                <span className="text-yellow-400 font-bold">In Progress</span>
              )}
            </p>
          </div>

          <button
            onClick={handleCompleteLesson}
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium flex items-center justify-center"
          >
            Complete Lesson
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      )}
    </div>
  )
}

export default BlockchainConnect

