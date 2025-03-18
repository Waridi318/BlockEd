// "use client"

// import type React from "react"
// import { Power } from "lucide-react"
// import type { WalletState, WalletActions } from "./wallet-connector"

// interface WalletButtonProps {
//   walletState: WalletState
//   walletActions: WalletActions
//   onSuccess?: (address: string) => void
// }

// const WalletButton: React.FC<WalletButtonProps> = ({ walletState, walletActions, onSuccess }) => {
//   const { address, isConnected, isConnecting } = walletState
//   const { connect, disconnect } = walletActions

//   const handleConnect = async () => {
//     try {
//       await connect()
//       if (onSuccess && address) {
//         onSuccess(address)
//       }
//     } catch (error) {
//       console.error("Failed to connect wallet:", error)
//     }
//   }

//   const handleDisconnect = () => {
//     disconnect()
//   }

//   const displayAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ""

//   return (
//     <button
//       onClick={isConnected ? handleDisconnect : handleConnect}
//       disabled={isConnecting}
//       className="relative px-8 py-3 group overflow-hidden rounded-xl cursor-pointer"
//     >
//       <div
//         className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-70 
//         group-hover:opacity-100 transition-opacity duration-300"
//       />
//       <div
//         className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 blur-xl 
//         group-hover:blur-2xl transition-all duration-300"
//       />
//       <span className="relative z-10 flex items-center gap-2">
//         {isConnecting ? (
//           "Connecting..."
//         ) : isConnected ? (
//           <>
//             <span>{displayAddress}</span>
//             <Power className="w-4 h-4" />
//           </>
//         ) : (
//           "Connect Wallet"
//         )}
//       </span>
//     </button>
//   )
// }

// export default WalletButton

