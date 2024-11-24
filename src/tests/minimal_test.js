import http from "k6/http";
import { MINIMAL_TEST } from "../config/test_options.js"; // Import the pre-defined options


// MINIMAL_TEST: Lightweight test for debugging purposes
// Use this for debugging

export let options = MINIMAL_TEST; // Use the options from test_options.js

export default function () {
  http.get("https://httpbin.org/get"); // Simple GET request to a test endpoint
}
