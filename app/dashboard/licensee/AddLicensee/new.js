"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const AddLicensePage = ({ searchParams }) => {
  const status = searchParams?.status || "";
  const message = searchParams?.message || "";

  const [formData, setFormData] = useState({
    person_name: "",
    father_name: "",
    company_name: "",
    current_address: "",
    permanent_address: "",
    cnic: "",
    phone: "",
    email: "",
    status_of_land: "",
    size_of_plot: "",
    land_owning_agency: "",
    gallon_req: "",
    document_type: "",
    image_path: "",
    previous_license_company_name: "",
    previous_license_contact: "",
    current_bore_number: "",
    motor_detail_pumps: "",
    water_supply_source: "",
    gps_location: "",
    flow_meter_make: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (status && message) {
      Swal.fire({
        title: status === "success" ? "Success!" : "Error!",
        text: decodeURIComponent(message),
        icon: status === "success" ? "success" : "error",
        confirmButtonText: "OK",
      });
    }
  }, [status, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form data
    // send a POST request to your API route with the formData object
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <form action="/api/addLicense" method="POST" className="space-y-6" onSubmit={handleSubmit}>
        {/* Customer Details */}
        <h3 className="text-xl font-semibold">Customer Details</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Person Name"
            name="person_name"
            value={formData.person_name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Father's Name"
            name="father_name"
            value={formData.father_name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Company Name"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Current Address"
            name="current_address"
            value={formData.current_address}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Permanent Address"
            name="permanent_address"
            value={formData.permanent_address}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="CNIC"
            name="cnic"
            value={formData.cnic}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Status and Additional Information */}
        <div className="space-y-4">
          <select
            name="status_of_land"
            value={formData.status_of_land}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Status of Land</option>
            <option value="1">Owned</option>
            <option value="2">Rental</option>
          </select>
          <input
            type="text"
            placeholder="Size of Plot"
            name="size_of_plot"
            value={formData.size_of_plot}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Land Owning Agency"
            name="land_owning_agency"
            value={formData.land_owning_agency}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Gallon Requirement"
            name="gallon_req"
            value={formData.gallon_req}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Document Upload */}
        <h3 className="text-xl font-semibold">Customer Documents</h3>
        <div className="space-y-4">
          <select
            name="document_type"
            value={formData.document_type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="licensee">Licensee</option>
            <option value="ntn">NTN</option>
            <option value="srb">SRB</option>
          </select>
          <input
            type="file"
            name="image_path"
            accept="image/*"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Previous License Information */}
        <h3 className="text-xl font-semibold">Previous License Details</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Previous License Company Name"
            name="previous_license_company_name"
            value={formData.previous_license_company_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Previous License Contact"
            name="previous_license_contact"
            value={formData.previous_license_contact}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Current Bore Details */}
        <h3 className="text-xl font-semibold">Current Bore Details</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Current Bore Number"
            name="current_bore_number"
            value={formData.current_bore_number}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Motor Details */}
        <h3 className="text-xl font-semibold">Motor Details</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Number of Pumps"
            name="motor_detail_pumps"
            value={formData.motor_detail_pumps}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Water Supply Source */}
        <h3 className="text-xl font-semibold">Water Supply Source</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Source of Water"
            name="water_supply_source"
            value={formData.water_supply_source}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Flow Meter Details */}
        <h3 className="text-xl font-semibold">Flow Meter Details</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Flow Meter Make"
            name="flow_meter_make"
            value={formData.flow_meter_make}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md mt-4 hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddLicensePage;
