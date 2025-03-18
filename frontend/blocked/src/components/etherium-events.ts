/**
 * Ethereum Event Handling Utilities
 *
 * This file provides safe methods for working with Ethereum provider events
 * to avoid common errors like "addListener is not a function"
 */

// Type-safe event subscription that works with different provider implementations
export function safeSubscribe(provider: any, eventName: string, handler: (...args: any[]) => void): () => void {
    if (!provider) {
      console.warn("No provider available for event subscription")
      return () => {}
    }
  
    // Try different methods that providers might implement
    try {
      // Most providers use .on() method
      if (typeof provider.on === "function") {
        provider.on(eventName, handler)
        return () => {
          if (typeof provider.removeListener === "function") {
            provider.removeListener(eventName, handler)
          } else if (typeof provider.off === "function") {
            provider.off(eventName, handler)
          }
        }
      }
  
      // Some older providers use addEventListener
      else if (typeof provider.addEventListener === "function") {
        provider.addEventListener(eventName, handler)
        return () => {
          if (typeof provider.removeEventListener === "function") {
            provider.removeEventListener(eventName, handler)
          }
        }
      }
  
      // Fallback for other implementations
      else if (typeof provider.addListener === "function") {
        provider.addListener(eventName, handler)
        return () => {
          if (typeof provider.removeListener === "function") {
            provider.removeListener(eventName, handler)
          }
        }
      }
    } catch (error) {
      console.error(`Error subscribing to ${eventName} event:`, error)
    }
  
    // Return empty cleanup function if subscription failed
    return () => {}
  }
  
  // Helper to detect which event method is supported
  export function getProviderEventMethod(provider: any): "on" | "addEventListener" | "addListener" | null {
    if (!provider) return null
  
    if (typeof provider.on === "function") return "on"
    if (typeof provider.addEventListener === "function") return "addEventListener"
    if (typeof provider.addListener === "function") return "addListener"
  
    return null
  }
  
  // Check if a provider is available and properly initialized
  export function isProviderReady(provider: any): boolean {
    return (
      provider !== undefined &&
      provider !== null &&
      (typeof provider.on === "function" ||
        typeof provider.addEventListener === "function" ||
        typeof provider.addListener === "function")
    )
  }
  
  