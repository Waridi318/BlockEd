// "use client"

// import { useState, useEffect, useRef } from "react"
// import { CuboidIcon as Cube, LinkIcon, Database, Shield } from "lucide-react"

// interface Block {
//   id: number
//   hash: string
//   prevHash: string
//   data: string
//   timestamp: number
// }

// export default function BlockchainExplorer() {
//   const [blocks, setBlocks] = useState<Block[]>([])
//   const [newBlockData, setNewBlockData] = useState("")
//   const [isDarkMode, setIsDarkMode] = useState(false)
//   const canvasRef = useRef<HTMLCanvasElement>(null)

//   // Check for dark mode
//   useEffect(() => {
//     const isDark = document.documentElement.classList.contains("dark")
//     setIsDarkMode(isDark)

//     const observer = new MutationObserver((mutations) => {
//       mutations.forEach((mutation) => {
//         if (mutation.attributeName === "class") {
//           const isDark = document.documentElement.classList.contains("dark")
//           setIsDarkMode(isDark)
//         }
//       })
//     })

//     observer.observe(document.documentElement, { attributes: true })
//     return () => observer.disconnect()
//   }, [])

//   // Initialize blockchain
//   useEffect(() => {
//     // Genesis block
//     const genesisBlock: Block = {
//       id: 0,
//       hash: "0000genesis",
//       prevHash: "0000000000",
//       data: "Genesis Block",
//       timestamp: Date.now(),
//     }
//     setBlocks([genesisBlock])
//   }, [])

//   // Draw blockchain connections
//   useEffect(() => {
//     if (!canvasRef.current || blocks.length < 2) return

//     const canvas = canvasRef.current
//     const ctx = canvas.getContext("2d")
//     if (!ctx) return

//     // Set canvas dimensions
//     canvas.width = canvas.offsetWidth
//     canvas.height = canvas.offsetHeight

//     ctx.clearRect(0, 0, canvas.width, canvas.height)

//     // Draw connections between blocks
//     ctx.strokeStyle = isDarkMode ? "rgba(139, 92, 246, 0.5)" : "rgba(139, 92, 246, 0.7)"
//     ctx.lineWidth = 3

//     const blockElements = document.querySelectorAll(".block-item")

//     if (blockElements.length >= 2) {
//       for (let i = 1; i < blockElements.length; i++) {
//         const currentBlock = blockElements[i].getBoundingClientRect()
//         const prevBlock = blockElements[i - 1].getBoundingClientRect()

//         const canvasRect = canvas.getBoundingClientRect()

//         const startX = prevBlock.right - canvasRect.left
//         const startY = prevBlock.top + prevBlock.height / 2 - canvasRect.top
//         const endX = currentBlock.left - canvasRect.left
//         const endY = currentBlock.top + currentBlock.height / 2 - canvasRect.top

//         // Draw curved line
//         ctx.beginPath()
//         ctx.moveTo(startX, startY)
//         ctx.bezierCurveTo(startX + (endX - startX) * 0.4, startY, startX + (endX - startX) * 0.6, endY, endX, endY)
//         ctx.stroke()

//         // Draw arrow
//         const arrowSize = 8
//         const angle = Math.atan2(endY - (startY + (endY - startY) * 0.8), endX - (startX + (endX - startX) * 0.8))

//         ctx.beginPath()
//         ctx.moveTo(endX, endY)
//         ctx.lineTo(endX - arrowSize * Math.cos(angle - Math.PI / 6), endY - arrowSize * Math.sin(angle - Math.PI / 6))
//         ctx.lineTo(endX - arrowSize * Math.cos(angle + Math.PI / 6), endY - arrowSize * Math.sin(angle + Math.PI / 6))
//         ctx.closePath()
//         ctx.fillStyle = isDarkMode ? "rgba(139, 92, 246, 0.8)" : "rgba(139, 92, 246, 1)"
//         ctx.fill()
//       }
//     }
//   }, [blocks, isDarkMode])

//   // Simple hash function for demonstration
//   const calculateHash = (id: number, prevHash: string, data: string, timestamp: number): string => {
//     const hashInput = `${id}${prevHash}${data}${timestamp}`
//     let hash = 0
//     for (let i = 0; i < hashInput.length; i++) {
//       const char = hashInput.charCodeAt(i)
//       hash = (hash << 5) - hash + char
//       hash = hash & hash
//     }
//     return Math.abs(hash).toString(16).padStart(8, "0")
//   }

//   const addBlock = () => {
//     if (!newBlockData.trim()) return

//     const lastBlock = blocks[blocks.length - 1]
//     const newBlock: Block = {
//       id: lastBlock.id + 1,
//       prevHash: lastBlock.hash,
//       data: newBlockData,
//       timestamp: Date.now(),
//       hash: "",
//     }

//     // Calculate hash
//     newBlock.hash = calculateHash(newBlock.id, newBlock.prevHash, newBlock.data, newBlock.timestamp)

//     setBlocks([...blocks, newBlock])
//     setNewBlockData("")

//     // Add animation class to the new block
//     setTimeout(() => {
//       const blockElements = document.querySelectorAll(".block-item")
//       const newBlockElement = blockElements[blockElements.length - 1]
//       if (newBlockElement) {
//         newBlockElement.classList.add("animate-pop")
//       }
//     }, 100)
//   }

//   return (
//     <div className="relative w-full overflow-hidden rounded-xl p-6 mb-8">
//       <div className={`absolute inset-0 ${isDarkMode ? "bg-slate-800/90" : "bg-white/90"} backdrop-blur-md`}></div>

//       {/* Floating particles specific to this component */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         {[...Array(10)].map((_, i) => (
//           <div
//             key={i}
//             className={`absolute rounded-full animate-float ${isDarkMode ? "bg-purple-400/10" : "bg-blue-400/10"}`}
//             style={{
//               width: `${Math.random() * 20 + 5}px`,
//               height: `${Math.random() * 20 + 5}px`,
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               animationDuration: `${Math.random() * 15 + 10}s`,
//               animationDelay: `-${Math.random() * 15}s`,
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative z-10">
//         <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
//           Interactive Blockchain Explorer
//         </h3>

//         <p className={`mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
//           See how blockchain works! Each block contains data and is linked to the previous block by its hash.
//         </p>

//         <div className="flex flex-col md:flex-row gap-4 mb-8">
//           <input
//             type="text"
//             value={newBlockData}
//             onChange={(e) => setNewBlockData(e.target.value)}
//             placeholder="Enter data for new block"
//             className={`flex-grow px-4 py-3 rounded-lg ${
//               isDarkMode
//                 ? "bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
//                 : "bg-white border-gray-200 text-gray-800 placeholder:text-gray-400"
//             } border focus:outline-none focus:ring-2 focus:ring-purple-500`}
//           />

//           <button
//             onClick={addBlock}
//             className="px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
//           >
//             Mine New Block
//           </button>
//         </div>

//         {/* Canvas for drawing connections */}
//         <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

//         {/* Blockchain visualization */}
//         <div className="relative flex flex-wrap gap-6 justify-center">
//           {blocks.map((block, index) => (
//             <div
//               key={block.id}
//               className={`block-item relative p-5 rounded-xl ${
//                 isDarkMode ? "bg-slate-700 border-slate-600" : "bg-white border-gray-200"
//               } border shadow-lg w-64 transition-all duration-300 hover:shadow-xl hover:scale-105`}
//             >
//               <div
//                 className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center ${
//                   isDarkMode ? "bg-blue-500" : "bg-purple-500"
//                 } text-white font-bold`}
//               >
//                 {block.id}
//               </div>

//               <div className="flex items-center gap-2 mb-3">
//                 <Cube className={`w-5 h-5 ${isDarkMode ? "text-blue-400" : "text-purple-500"}`} />
//                 <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Block #{block.id}</h4>
//               </div>

//               <div className="space-y-2 text-sm">
//                 <div className="flex items-start gap-2">
//                   <Database className={`w-4 h-4 mt-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
//                   <div>
//                     <p className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Data:</p>
//                     <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} break-words`}>{block.data}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-2">
//                   <Shield className={`w-4 h-4 mt-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
//                   <div>
//                     <p className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Hash:</p>
//                     <p className={`${isDarkMode ? "text-blue-400" : "text-blue-600"} font-mono text-xs`}>
//                       {block.hash}
//                     </p>
//                   </div>
//                 </div>

//                 {block.id > 0 && (
//                   <div className="flex items-start gap-2">
//                     <LinkIcon className={`w-4 h-4 mt-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
//                     <div>
//                       <p className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Prev Hash:</p>
//                       <p className={`${isDarkMode ? "text-purple-400" : "text-purple-600"} font-mono text-xs`}>
//                         {block.prevHash}
//                       </p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

