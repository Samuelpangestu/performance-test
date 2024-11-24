/**
 * Utility functions for k6 scripts.
 */

// Generate random strings for testing
export function generateRandomString(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
  }
  
  // Get environment variables with fallback
  export function getEnvVar(key, defaultValue = "") {
    return __ENV[key] || defaultValue;
  }
  