import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [jsonInput, setJsonInput] = useState(""); // JSON input state
  const [selectedOptions, setSelectedOptions] = useState([]); // Dropdown selection state
  const [response, setResponse] = useState(null); // API response state
  const [error, setError] = useState(""); // Error state for invalid inputs
  const [showDropdown, setShowDropdown] = useState(false); // Controls dropdown visibility

  // Set document title to roll number (replace with your actual roll number)
  document.title = "YourRollNumber";

  // Validate JSON input
  const validateJson = (input) => {
    try {
      const parsed = JSON.parse(input);
      if (parsed && parsed.data && Array.isArray(parsed.data)) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateJson(jsonInput)) {
      setError("Invalid JSON format. Please use format: {\"data\": [\"A\", \"1\", \"b\"]}");
      setShowDropdown(false);
      return;
    }

    setError(""); // Clear any previous errors

    try {
      // Make the API request to your backend with the JSON input
      const res = await axios.post("YOUR_BACKEND_API_URL", {
        data: JSON.parse(jsonInput).data,
      });

      // Set the response and show the dropdown
      setResponse(res.data);
      setShowDropdown(true);
    } catch (err) {
      setError("API request failed. Please check your backend API URL.");
      setShowDropdown(false);
    }
  };

  // Handle dropdown selection changes
  const handleDropdownChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions((prev) =>
      checked ? [...prev, value] : prev.filter((option) => option !== value)
    );
  };

  // Filter the response data based on selected options
  const filterResponseData = () => {
    if (!response) return "";

    let filteredData = response.data;

    if (selectedOptions.includes("Alphabets")) {
      filteredData = filteredData.filter((item) => isNaN(item)); // Only alphabets
    }

    if (selectedOptions.includes("Numbers")) {
      filteredData = filteredData.filter((item) => !isNaN(item)); // Only numbers
    }

    if (selectedOptions.includes("HighestLowercase")) {
      const lowercaseLetters = filteredData.filter(
        (item) => item >= "a" && item <= "z"
      );
      filteredData =
        lowercaseLetters.length > 0
          ? [lowercaseLetters.reduce((a, b) => (b > a ? b : a))]
          : [];
    }

    return filteredData.join(", ");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>SRM Qualifier</h1>

      {/* JSON Input */}
      <textarea
        rows="4"
        placeholder='Enter JSON like {"data": ["A", "1", "b"]}'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        Submit
      </button>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Dropdown for filtering options (appears after valid submission) */}
      {showDropdown && (
        <div style={{ marginBottom: "20px" }}>
          <label style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              value="Alphabets"
              onChange={handleDropdownChange}
            />
            Alphabets
          </label>
          <label style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              value="Numbers"
              onChange={handleDropdownChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="HighestLowercase"
              onChange={handleDropdownChange}
            />
            Highest Lowercase Alphabet
          </label>
        </div>
      )}

      {/* Render Filtered Response */}
      <div style={{ border: "1px solid #ccc", padding: "10px" }}>
        <strong>Filtered Response: </strong>
        {response && filterResponseData()}
      </div>
    </div>
  );
};

export default App;