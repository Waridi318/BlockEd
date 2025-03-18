import { ethers } from "ethers"

const CONTRACT_ADDRESS = "0x56D46D62AC6C60603f451820F61f44d4270bf7A5"


const LearningAppABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "CertificateIssued",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "completeLesson",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "issueCertificate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "lessonsCompleted",
				"type": "uint256"
			}
		],
		"name": "LessonCompleted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "registerUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getUser",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "learners",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "users",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "lessonsCompleted",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "certified",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]



export async function getContract() {
  if (typeof window.ethereum === "undefined") {
    throw new Error("Please install MetaMask to use this application")
  }

  await window.ethereum.request({ method: "eth_requestAccounts" })

  // Updated for ethers v6
  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()

  const contract = new ethers.Contract(CONTRACT_ADDRESS, LearningAppABI, signer)

  return contract
}

export async function registerUser(name: string) {
  try {
    const contract = await getContract()
    const tx = await contract.registerUser(name)
    await tx.wait()
    return true
  } catch (error) {
    console.error("Error registering user:", error)
    return false
  }
}

export async function completeLesson() {
  try {
    const contract = await getContract()
    const tx = await contract.completeLesson()
    await tx.wait()
    return true
  } catch (error) {
    console.error("Error completing lesson:", error)
    return false
  }
}

export async function issueCertificate() {
  try {
    const contract = await getContract()
    const tx = await contract.issueCertificate()
    await tx.wait()
    return true
  } catch (error) {
    console.error("Error issuing certificate:", error)
    return false
  }
}

export async function getUserData(address: string) {
  try {
    const contract = await getContract()
    const userData = await contract.getUser(address)
    return {
      name: userData[0],
      lessonsCompleted: Number(userData[1]), // Convert BigInt to Number
      certified: userData[2],
    }
  } catch (error) {
    console.error("Error getting user data:", error)
    return null
  }
}

// Add TypeScript declarations for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean
      request: (request: {
        method: string
        params?: any[]
      }) => Promise<any>
      on: (eventName: string, callback: (...args: any[]) => void) => void
      removeListener: (eventName: string, callback: (...args: any[]) => void) => void
    }
  }
}

