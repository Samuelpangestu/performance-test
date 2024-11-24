export const API_BASE_URL = __ENV.API_BASE_URL || "https://reqres.in";

export const ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  DATA: `${API_BASE_URL}/api/users`,
  USERS: `${API_BASE_URL}/users`,
};
