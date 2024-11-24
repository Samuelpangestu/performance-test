import http from "k6/http";
import { check, sleep } from "k6";

export class BaseTest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  // Send HTTP requests
  sendRequest(endpoint, method = "GET", body = null, headers = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    let response;

    if (method === "POST") {
      response = http.post(url, JSON.stringify(body), { headers });
    } else if (method === "PUT") {
      response = http.put(url, JSON.stringify(body), { headers });
    } else {
      response = http.get(url, { headers });
    }

    return response;
  }

  // Validate response
  validateResponse(response, expectedStatus) {
    check(response, {
      [`status is ${expectedStatus}`]: (res) => res.status === expectedStatus,
    });
  }

  // Delay execution
  delay(seconds = 1) {
    sleep(seconds);
  }
}
