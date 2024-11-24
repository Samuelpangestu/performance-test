import { Counter, Rate } from "k6/metrics"; // Import metrics
import { BREAKPOINT_TEST } from "../config/test_options.js";
import { BaseTest } from "../core/BaseTest.js";
import { ENDPOINTS } from "../sources/endpoints.js";
import { handleReport } from "../utils/reportHandler.js";

// Define custom metrics globally
export const tps = new Counter("tps");
export const errorRate = new Rate("error_rate");

// Add custom thresholds to BREAKPOINT_TEST
BREAKPOINT_TEST.thresholds = {
  http_req_duration: ["p(95)<400"], // 95% of requests must complete below 400ms
  tps: ["count>10"], // Ensure a minimum of 10 TPS
  error_rate: ["rate<0.03"], // Error rate must be less than 3%
};

export let options = BREAKPOINT_TEST;

export default function () {
  const test = new BaseTest(ENDPOINTS.DATA); // Replace DATA with your endpoint
  const response = test.sendRequest("", "GET");

  // Record metrics
  tps.add(1); // Increment TPS counter for each request
  errorRate.add(response.status !== 200); // Add to error rate if status is not 200

  // Validate response
  test.validateResponse(response, 200);

  // Simulate user delay
  test.delay();
}

// Centralized report generation
export function handleSummary(data) {
  return handleReport(data, "breakpoint_test_report");
}
