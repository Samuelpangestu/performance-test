import { Counter, Rate } from "k6/metrics"; // Import metrics
import { MINIMAL_TEST, SMOKE_TEST } from "../config/test_options.js";
import { BaseTest } from "../core/BaseTest.js";
import { ENDPOINTS } from "../endpoints/sample_endpoint.js";
import { handleReport } from "../utils/reportHandler.js";

// Define custom metrics globally
export const tps = new Counter("tps");
export const errorRate = new Rate("error_rate");

// Add custom thresholds to SMOKE_TEST
SMOKE_TEST.thresholds = {
  http_req_duration: ["p(95)<500"], // 95% of requests must complete below 500ms
  "tps": ["count>30"], // Ensure a minimum of 30 TPS
  "error_rate": ["rate<0.01"], // Error rate must be less than 1%
};

export let options = MINIMAL_TEST;

export default function () {
  const test = new BaseTest(ENDPOINTS.DATA); // Initialize BaseTest
  const response = test.sendRequest("", "GET");

  // Record metrics
  tps.add(1); // Increment TPS counter
  errorRate.add(response.status !== 200); // Mark as error if status is not 200

  // Validate response
  test.validateResponse(response, 200);

  // Simulate user delay
  test.delay();
}

// Centralized report generation
export function handleSummary(data) {
  return handleReport(data, "minimal_test_report");
}
