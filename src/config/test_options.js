import { getEnvVariable } from "../utils/env.js";

// Enable web dashboard using environment variables
const enableWebDashboard = getEnvVariable("K6_WEB_DASHBOARD", false);
const webDashboardHost = getEnvVariable("K6_WEB_DASHBOARD_HOST", "localhost");
const webDashboardPort = getEnvVariable("K6_WEB_DASHBOARD_PORT", "5665");

// Centralize web dashboard configuration
export const WEB_DASHBOARD_CONFIG = enableWebDashboard
  ? { host: webDashboardHost, port: webDashboardPort }
  : null;

// SMOKE_TEST: Quick and lightweight test to verify basic functionality
export const SMOKE_TEST = {
  stages: [
    { duration: "1m", target: 5 }, // Minimal load for a short duration
    { duration: "1m", target: 5 },
    { duration: "1m", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<200"], // 95% of requests should complete within 200ms
    tps: ["count>5"], // Ensure at least 5 transactions per second
    error_rate: ["rate<0.01"], // Error rate must be less than 1%
  },
};

// LOAD_TEST: Moderate load test to measure performance under normal conditions
export const LOAD_TEST = {
  stages: [
    { duration: "5m", target: 50 }, // Gradual ramp-up to 50 users
    { duration: "10m", target: 100 }, // Sustain 100 users
    { duration: "5m", target: 0 }, // Ramp-down
  ],
  thresholds: {
    http_req_duration: ["p(95)<300"], // 95% of requests should complete within 300ms
    tps: ["count>50"], // Ensure at least 50 transactions per second
    error_rate: ["rate<0.02"], // Error rate must be less than 2%
  },
};

// STRESS_TEST: High load to test system stability and breaking point
export const STRESS_TEST = {
  stages: [
    { duration: "5m", target: 100 }, // Normal load
    { duration: "10m", target: 300 }, // Heavy load
    { duration: "5m", target: 500 }, // Overload (breaking point)
    { duration: "10m", target: 0 }, // Recovery
  ],
  thresholds: {
    http_req_duration: ["p(95)<1000"], // 95% of requests should complete within 1000ms
    error_rate: ["rate<0.05"], // Error rate must be less than 5%
  },
};

// SOAK_TEST: Extended duration to identify long-term performance issues
export const SOAK_TEST = {
  stages: [
    { duration: "30m", target: 200 }, // Sustained high load
    { duration: "30m", target: 200 }, // Continue high load
    { duration: "10m", target: 0 }, // Ramp-down
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% of requests should complete within 500ms
    error_rate: ["rate<0.01"], // Error rate must be less than 1%
  },
};

// BREAKPOINT_TEST: Gradual increase to maximum supported load
export const BREAKPOINT_TEST = {
  stages: [
    { duration: "2m", target: 10 }, // Light load
    { duration: "2m", target: 20 }, // Medium load
    { duration: "2m", target: 30 }, // Heavy load
    { duration: "2m", target: 0 }, // Ramp-down
  ],
  thresholds: {
    http_req_duration: ["p(95)<400"], // 95% of requests should complete within 400ms
    error_rate: ["rate<0.03"], // Error rate must be less than 3%
  },
};

// MINIMAL_TEST: Lightweight test for debugging purposes
export const MINIMAL_TEST = {
  scenarios: {
    default: {
      executor: "constant-vus",
      vus: 1, // Single virtual user
      duration: "20s", // Short duration for quick debugging
    },
  },
  thresholds: {
    http_req_duration: ["p(95)<1000"], // Allow up to 1000ms for debugging
  },
};
