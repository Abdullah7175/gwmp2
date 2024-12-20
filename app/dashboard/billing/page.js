"use client"
import { useState } from "react";

const Billing = () => {
  const [formData, setFormData] = useState({
    customerID: "",
    bores: [{ cbid: "", gallonsUtilized: 0 }],
  });

  const handleCustomerChange = (e) => {
    setFormData({ ...formData, customerID: e.target.value });
  };

  const handleBoreChange = (index, field, value) => {
    const updatedBores = formData.bores.map((bore, i) =>
      i === index ? { ...bore, [field]: value } : bore
    );
    setFormData({ ...formData, bores: updatedBores });
  };

  const addBoreField = () => {
    setFormData({
      ...formData,
      bores: [...formData.bores, { cbid: "", gallonsUtilized: 0 }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("@/api/generateBill", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    alert(`Bill generated: ${result.message}`);
  };

  return (
    <div className="md:h-[66.8%]">
    <div className="max-w-md mx-auto bg-gray-100 p-6 border border-gray-300 rounded-lg mt-10 mb-3">
      <h2 className="text-xl font-semibold text-center mb-4">Generate Bill Here...</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm font-medium mb-2">Customer ID:</label>
        <input
          type="text"
          value={formData.customerID}
          onChange={handleCustomerChange}
          required
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />

        {formData.bores.map((bore, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <label className="block text-sm font-medium mb-2">Bore ID:</label>
            <input
              type="text"
              value={bore.cbid}
              onChange={(e) => handleBoreChange(index, "cbid", e.target.value)}
              required
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <label className="block text-sm font-medium mb-2">Gallons Utilized:</label>
            <input
              type="number"
              value={bore.gallonsUtilized}
              onChange={(e) => handleBoreChange(index, "gallonsUtilized", e.target.value)}
              required
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        ))}

        <button type="button" onClick={addBoreField} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
          Add Bore
        </button>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
          Generate Bill
        </button>
      </form>
    </div>
    </div>
  );
};

export default Billing;
