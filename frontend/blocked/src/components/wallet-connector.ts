/**
 * Wallet Connection Utilities
 *
 * This file provides robust methods for connecting to Ethereum wallets
 * with proper error handling and type safety
 */

import { safeSubscribe } from "../components/etherium-events"

// Types for wallet providers
export interface EthereumProvider {
  isMetaMask?: boolean
  request: (request: { method: string; params?: any[] }) => Promise<any>
  on?: (eventName: string, callback: (...args: any[]) => void) => void
  removeListener?: (eventName: string, callback: (...args: any[]) => void) => void
  // Some providers use these methods instead
  addEventListener?: (eventName: string, callback: (...args: any[]) => void) => void
  removeEventListener?: (eventName: string, callback: (...args: any[]) => void) => void
  addListener?: (eventName: string, callback: (...args: any[]) => void) => void
}

export interface EduChainWallet {
  connect: () => Promise<string>
  disconnect: () => Promise<void>
}

// Safe method to get the Ethereum provider
export function getEthereumProvider(): EthereumProvider | null {
  if (typeof window !== "undefined") {
    // Check for window.ethereum (MetaMask and most providers)
    if (window.ethereum) {
      return window.ethereum
    }

    // Check for older EIP-1193 providers that might be in window.web3
    if (window.web3 && window.web3.currentProvider) {
      return window.web3.currentProvider as EthereumProvider
    }

    // Check for multiple injected providers (common in mobile wallets)
    const providers = (window as any).ethereum?.providers
    if (Array.isArray(providers)) {
      // Prefer MetaMask if available
      const metaMaskProvider = providers.find((p) => p.isMetaMask)
      if (metaMaskProvider) return metaMaskProvider

      // Otherwise use the first available provider
      if (providers.length > 0) return providers[0]
    }
  }

  return null
}

// Update the connectToWallet function to ensure it doesn't use any eval-like patterns
export async function connectToWallet(
  onSuccess: (address: string) => void,
  onError: (error: Error) => void,
): Promise<void> {
  const provider = getEthereumProvider()

  if (!provider) {
    onError(new Error("No Ethereum provider found. Please install MetaMask or another wallet."))
    return
  }

  try {
    // Use direct method calls instead of any dynamic evaluation
    const accounts = await provider.request({ method: "eth_requestAccounts" })

    if (accounts && accounts.length > 0) {
      onSuccess(accounts[0])

      // Set up event listener for account changes
      const handleAccountsChanged = (newAccounts: string[]) => {
        if (newAccounts.length === 0) {
          // User disconnected
          onError(new Error("Wallet disconnected"))
        } else {
          // Account changed
          onSuccess(newAccounts[0])
        }
      }

      // Use our safe subscribe method
      safeSubscribe(provider, "accountsChanged", handleAccountsChanged)
    } else {
      onError(new Error("No accounts returned from wallet"))
    }
  } catch (error) {
    // Handle specific error codes
    if (typeof error === "object" && error !== null && "code" in error) {
      const code = (error as any).code

      if (code === 4001) {
        onError(new Error("User rejected the connection request"))
      } else if (code === -32002) {
        onError(new Error("Connection request already pending. Check your wallet."))
      } else {
        onError(new Error(`Wallet connection failed: ${(error as any).message || "Unknown error"}`))
      }
    } else {
      onError(new Error("Failed to connect to wallet"))
    }
  }
}

