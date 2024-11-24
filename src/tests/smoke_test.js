import { Counter, Rate } from "k6/metrics";
import { SMOKE_TEST } from "../config/test_options.js";
import { handleReport } from "../utils/reportHandler.js";
import { BaseTest } from "../config/base_test.js";

// Load dynamic endpoints based on __ENV.ENDPOINT_SOURCE
const endpointSource = __ENV.ENDPOINT_SOURCE || "default";
const { ENDPOINTS } = require(`../endpoints/${endpointSource}/sample_endpoint.js`);

// Define custom metrics globally
export const tps = new Counter("tps");
export const errorRate = new Rate("error_rate");

// Add custom thresholds to SMOKE_TEST
SMOKE_TEST.thresholds = {
  http_req_duration: ["p(95)<500"], // 95% of requests must complete below 500ms
  "tps": ["count>30"], // Ensure a minimum of 30 TPS
  "error_rate": ["rate<0.01"], // Error rate must be less than 1%
};

export let options = SMOKE_TEST;

export default function () {
  const test = new BaseTest(ENDPOINTS.DATA); // Initialize BaseTest with dynamic ENDPOINTS
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
  // Dynamically generate the report name based on the endpoint source
  const reportName = `${endpointSource}_sample_endpoint_smoke`;
  return handleReport(data, reportName);
}
