import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

/**
 * Handle summary and generate the report.
 * @param {object} data - The k6 test data.
 * @param {string} reportName - Name of the report file (default: "test_report").
 */
export function handleReport(data, reportName = "test_report") {
  const reportsFolder = "reports"; // Specify the folder
  const filePath = `${reportsFolder}/${reportName}.html`; // Full report path
  return {
    [filePath]: htmlReport(data),
  };
}
