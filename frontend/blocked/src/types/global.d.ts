import { MetaMaskInpageProvider } from "@metamask/providers";

/**
 * Global TypeScript declarations for Ethereum and Web3 providers
 *
 * This file extends the Window interface to include properties
 * that are injected by wallet providers like MetaMask.
 */

interface EthereumProvider {
  isMetaMask?: boolean
  request: (request: { method: string; params?: any[] }) => Promise<any>
  on?: (eventName: string, callback: (...args: any[]) => void) => void
  removeListener?: (eventName: string, callback: (...args: any[]) => void) => void
  addEventListener?: (eventName: string, callback: (...args: any[]) => void) => void
  removeEventListener?: (eventName: string, callback: (...args: any[]) => void) => void
  addListener?: (eventName: string, callback: (...args: any[]) => void) => void
  providers?: EthereumProvider[]
}

interface EduChainWalletProvider {
  connect: () => Promise<string>
  disconnect: () => Promise<void>
}

interface Web3Provider {
  currentProvider: any
}

declare global {
  interface Window {
    ethereum?: EthereumProvider
    web3?: Web3Provider
    eduChainWallet?: EduChainWalletProvider
  }
}

// This empty export is needed to make this file a module
export {}


  
  