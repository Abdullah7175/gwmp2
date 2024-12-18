"use client";
import { useState } from "react";

const WaterTax = () => {
  const [rate, setRate] = useState(1.5); // Default rate is 1.5%

  const handleRateChange = (e) => {
    setRate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send new rate to API for updating water tax
    const response = await fetch("@/api/updateWaterTax", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rate }),
    });
    const result = await response.json();
    alert(`Water Tax updated: ${result.message}`);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 p-6 border border-gray-300 rounded-lg mt-10">
      <h2 className="text-xl font-semibold text-center mb-4">Update Water Tax Rate</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Water Tax Rate (%):
        </label>
        <input
          type="number"
          step="0.1"
          value={rate}
          onChange={handleRateChange}
          required
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Update Rate
        </button>
      </form>
    </div>
  );
};

export default WaterTax;
