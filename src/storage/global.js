// documentService.js
const DEFAULT_TTL_IN_MICROSECONDS = 30 * 24 * 60 * 60 * 1000; // 30 Days
const MAX_TTL_IN_MICROSECONDS = 90 * 24 * 60 * 60 * 1000; // 90 Days

// endpoints
const CORS_ERROR_HEADER = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true
};

module.exports = {
  DEFAULT_TTL_IN_MICROSECONDS,
  MAX_TTL_IN_MICROSECONDS,
  CORS_ERROR_HEADER
};