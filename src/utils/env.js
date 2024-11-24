/**
 * Utility to handle environment variables with fallback values.
 * Fetches from `__ENV` and applies a default value if not set.
 */
export function getEnvVariable(varName, defaultValue) {
  const value = __ENV[varName];
  if (value === undefined) return defaultValue;
  // Auto-convert "true"/"false" strings to booleans
  if (defaultValue === true || defaultValue === false) {
    return value.toLowerCase() === "true";
  }
  return value;
}
