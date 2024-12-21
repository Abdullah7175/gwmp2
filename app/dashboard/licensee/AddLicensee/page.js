"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
//import { addUser } from "@/app/lib/actions";
import styles from "@/components/addCustomer.module.css";
import { MdAddCircleOutline } from "react-icons/md";

//import { addGroundwaterExtraction } from "@/app/lib/data";

const AddLicensee = ({ status, message }) => {
  const [formData, setFormData] = useState({
    pbwd_row: [{ number_of_bore_well: "", gps_location_pb: "" }],
    pgwd_row: [{ sizeofborep: "", volumestoragep: "", gps_location_pg: "" }],
    agwd_row: [{ sizeofboreap: "", volumestorageap: "", gps_location_ap: "" }],
    dcb_row: [
      {
        number_of_bores: "",
        size_of_pipe: "",
        depth_volume_storage: "",
        discharge_per_month: "",
        gps_location_cb: "",
      },
    ],
    dm_row: [
      {
        number_of_pumps: "",
        ro_plant: "",
        pump_make: "",
        power_of_motor: "",
        discharge_gpm: "",
        gps_location_md: "",
      },
    ],
    dc_row: [{ consumer_name: "", quantum_supplied: "", gps_location_cd: "" }],
    dwss_row: [
      {
        source_of_water: "",
        existing_number_and_size: "",
        Volume_in_gallon: "",
      },
    ],
    iqgwb_row: [
      { consumer_name: "", quantum_supplied: "", gps_location_cd: "" },
    ],
    dpfm_row: [{ made: "", type: "", size: "" }],
    customer_documents: [{ id: 1, document_type: "", image_path: null }],
  });

  let identifier = "";
  const addRow = (identifier) => {
    setFormData((prevState) => {
      const newRow = { id: Date.now() }; // Unique key generated using current timestamp
      switch (identifier) {
        case "pbwd_id":
          newRow.number_of_bore_well = "";
          newRow.gps_location_pb = "";
          return { ...prevState, pbwd_row: [...prevState.pbwd_row, newRow] };
        case "pgwd_id":
          newRow.sizeofborep = "";
          newRow.volumestoragep = "";
          newRow.gps_location_pg = "";
          return { ...prevState, pgwd_row: [...prevState.pgwd_row, newRow] };
        case "dm_id":
          newRow.number_of_pumps = "";
          newRow.ro_plant = "";
          newRow.pump_make = "";
          newRow.power_of_motor = "";
          newRow.discharge_gpm = "";
          newRow.gps_location_md = "";
          return { ...prevState, dm_row: [...prevState.dm_row, newRow] };
        case "dcb_id":
          newRow.number_of_bores = "";
          newRow.size_of_pipe = "";
          newRow.depth_volume_storage = "";
          newRow.discharge_per_month = "";
          newRow.gps_location_cb = "";
          return { ...prevState, dcb_row: [...prevState.dcb_row, newRow] };
        case "dc_id":
          newRow.consumer_name = "";
          newRow.quantum_supplied = "";
          newRow.gps_location_cd = "";
          return { ...prevState, dc_row: [...prevState.dc_row, newRow] };
        case "dwss_id":
          newRow.source_of_water = "";
          newRow.existing_number_and_size = "";
          newRow.Volume_in_gallon = "";
          return { ...prevState, dwss_row: [...prevState.dwss_row, newRow] };
        case "iqgwb_id":
          newRow.consumer_name = "";
          newRow.quantum_supplied = "";
          newRow.gps_location_cd = "";
          return { ...prevState, iqgwb_row: [...prevState.iqgwb_row, newRow] };
        case "dpfm_id":
          newRow.made = "";
          newRow.type = "";
          newRow.size = "";
          return { ...prevState, dpfm_row: [...prevState.dpfm_row, newRow] };
        default:
          newRow.sizeofboreap = "";
          newRow.volumestorageap = "";
          newRow.gps_location_ap = "";
          return { ...prevState, agwd_row: [...prevState.agwd_row, newRow] };
      }
    });
  };

  const handleRowChange = (e, index, field) => {
    const value = e.target.value;
    setFormData((prevState) => {
      const updatedPgwd = prevState.pgwd_row.map((row, i) => {
        if (i === index) {
          return { ...row, [field]: value };
        }
        return row;
      });
      const updatedApgw = prevState.agwd_row.map((row, i) => {
        if (i === index) {
          return { ...row, [field]: value };
        }
        return row;
      });
      const updatedPbwd = prevState.pbwd_row.map((row, i) => {
        if (i === index) {
          return { ...row, [field]: value };
        }
        return row;
      });
      const updatedBcd = prevState.dcb_row.map((row, i) => {
        if (i === index) {
          return { ...row, [field]: value };
        }
        return row;
      });
      const updatedBm = prevState.dm_row.map((row, i) => {
        if (i === index) {
          return { ...row, [field]: value };
        }
        return row;
      });
      const updatedDc = prevState.dc_row.map((row, i) => {
        if (i === index) {
          return { ...row, [field]: value };
        }
        return row;
      });
      const updatedDwss = prevState.dwss_row.map((row, i) => {
        if (i === index) {
          return { ...row, [field]: value };
        }
        return row;
      });
      const updatedIqwb = prevState.iqgwb_row.map((row, i) => {
        if (i === index) {
          return { ...row, [field]: value };
        }
        return row;
      });
      const updatedDpfm = prevState.dpfm_row.map((row, i) => {
        if (i === index) {
          return { ...row, [field]: value };
        }
        return row;
      });
      return {
        ...prevState,
        agwd_row: updatedApgw,
        pbwd_row: updatedPbwd,
        pgwd_row: updatedPgwd,
        dcb_row: updatedBcd,
        dm_row: updatedBm,
        dc_row: updatedDc,
        dwss_row: updatedDwss,
        iqgwb_row: updatedIqwb,
        dpfm_row: updatedDpfm,
      };
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
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

  const handleDocumentChange = (index, e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => {
      const updatedDocuments = [...prevState.customer_documents];

      if (name === "image_path" && files.length > 0) {
        updatedDocuments[index].image_path = files[0]; // Store the File object directly
      } else if (name === "document_type") {
        updatedDocuments[index].document_type = value; // Update document type
      }

      return { ...prevState, customer_documents: updatedDocuments };
    });
  };

  const addDocument = () => {
    setFormData((prevState) => ({
      ...prevState,
      customer_documents: [
        ...prevState.customer_documents,
        {
          id: prevState.customer_documents.length + 1,
          document_type: "",
          image_path: null,
        },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting formData:", formData);

    const formDataToSend = new FormData(); // Corrected to use FormData

    // Append all fields
    Object.keys(formData).forEach((key) => {
      // Changed from formDataToSend to formData
      if (key !== "customer_documents" && Array.isArray(formData[key])) {
        formDataToSend.append(key, JSON.stringify(formData[key]));
      } else if (key !== "customer_documents") {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Append customer documents
    if (Array.isArray(formData.customer_documents)) {
      const customerDocumentsArray = formData.customer_documents.map((doc) => {
        return {
          document_type: doc.document_type || "",
          image_path: doc.image_path instanceof File ? doc.image_path : null,
        };
      });

      const appendedEntries = customerDocumentsArray.map((doc, index) => {
        formDataToSend.append(
          `customer_documents[${index}].document_type`,
          doc.document_type
        );
        if (doc.image_path) {
          formDataToSend.append(
            `customer_documents[${index}].image_path`,
            doc.image_path
          );
          return {
            document_type: doc.document_type,
            image_path: doc.image_path,
          };
        } else {
          console.log(`No valid image for document type: ${doc.document_type}`);
          return null;
        }
      });

      const validEntries = appendedEntries.filter((entry) => entry !== null);
    }

    try {
      const response = await fetch("/api/addlicenseetest", {
        method: "POST",
        body: formDataToSend,
      });
      if (response.ok) {
        // Success
        const data = await response.json();
        console.log("Form submitted successfully", data);
      } else {
        // Handle error
        console.error("Error submitting form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form
      className="max-w-5xl mx-auto p-6 border my-6 bg-white shadow-md rounded-lg"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <Link href="/dashboard/licensee">
        <button className={styles.backButton}>Back to Licensee</button>
      </Link>
      <h1 className="text-2xl font-bold text-center mb-4">
        License Application Form
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 mb-4">
        <div>
          <label
            htmlFor="catid"
            className="block text-gray-700 text-sm font-medium"
          >
            Type of License:
          </label>
          <select
            id="catid"
            name="catid"
            value={formData.catid}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select License Type</option>
            <option value="1">Industrial</option>
            <option value="2">Groundwater Operator</option>
            <option value="3">Commercial Including Hospitality</option>
            <option value="4">Healthcare & Educational</option>
            <option value="5">Residential Complex</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="form_number"
            className="block text-gray-700 text-sm font-medium"
          >
            Form Number:
          </label>
          <input
            type="number"
            id="form_number"
            name="form_number"
            value={formData.form_number}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 mb-4">
        <div>
          <label
            htmlFor="person_name"
            className="block text-gray-700 text-sm font-medium"
          >
            Person Name:
          </label>
          <input
            type="text"
            id="person_name"
            name="person_name"
            value={formData.person_name}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="father_name"
            className="block text-gray-700 text-sm font-medium"
          >
            Father Name:
          </label>
          <input
            type="text"
            id="father_name"
            name="father_name"
            value={formData.father_name}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 mb-4">
        <div>
          <label
            htmlFor="company_name"
            className="block text-gray-700 text-sm font-medium"
          >
            Company Name:
          </label>
          <input
            type="text"
            id="company_name"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="current_address"
            className="block text-sm font-medium"
          >
            Current Address:
          </label>
          <input
            type="text"
            id="current_address"
            name="current_address"
            value={formData.current_address}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 mb-4">
        <div>
          <label
            htmlFor="permanent_address"
            className="block text-gray-700 text-sm font-medium"
          >
            Permanent Address:
          </label>
          <input
            type="text"
            id="permanent_address"
            name="permanent_address"
            value={formData.permanent_address}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="cnic" className="block text-sm font-medium">
            CNIC Number:
          </label>
          <input
            type="text"
            id="cnic"
            name="cnic"
            value={formData.cnic}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="cnic_expiry" className="block text-sm font-medium">
            CNIC Expiry:
          </label>
          <input
            type="date"
            id="cnic_expiry"
            name="cnic_expiry"
            value={formData.cnic_expiry}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 mb-4">
        <div>
          <label
            htmlFor="phone"
            className="block text-gray-700 text-sm font-medium"
          >
            Contact Number:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-medium"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 mb-4">
        <div>
          <label
            htmlFor="status_of_land"
            className="block text-gray-700 text-sm font-medium"
          >
            Status of Land:
          </label>
          <select
            id="status_of_land"
            name="status_of_land"
            value={formData.status_of_land}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Status..</option>
            <option value="1">Owned</option>
            <option value="2">Rental</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="size_of_plot"
            className="block text-gray-700 text-sm font-medium"
          >
            Size of Plot:
          </label>
          <input
            type="text"
            id="size_of_plot"
            name="size_of_plot"
            value={formData.size_of_plot}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 mb-4">
        <div>
          <label
            htmlFor="land_owning_agency"
            className="block text-gray-700 text-sm font-medium"
          >
            Land Owning Agency:
          </label>
          <input
            type="text"
            id="land_owning_agency"
            name="land_owning_agency"
            value={formData.land_owning_agency}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="ntn_number"
            className="block text-gray-700 text-sm font-medium"
          >
            NTN Number:
          </label>
          <input
            type="text"
            id="ntn_number"
            name="ntn_number"
            value={formData.ntn_number}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="srb_number"
            className="block text-gray-700 text-sm font-medium"
          >
            SRB Number:
          </label>
          <input
            type="text"
            id="srb_number"
            name="srb_number"
            value={formData.srb_number}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 mb-4">
        <div>
          <label
            htmlFor="issue_date"
            className="block text-gray-700 text-sm font-medium"
          >
            License Issue Date:
          </label>
          <input
            type="date"
            id="issue_date"
            name="issue_date"
            value={formData.issue_date}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="gallon_req"
            className="block text-gray-700 text-sm font-medium"
          >
            Demand In million Gallon Per Month
          </label>
          <input
            type="number"
            id="gallon_req"
            name="gallon_req"
            value={formData.gallon_req}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="zid"
            className="block text-gray-700 text-sm font-medium"
          >
            Select Zone:
          </label>
          <select
            id="zid"
            name="zid"
            value={formData.zid}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Zone</option>
            <option value="1">Site-I</option>
            <option value="2">Site-II</option>
            <option value="3">Korangi Industrial</option>
            <option value="4">Landhi</option>
            <option value="5">Nakati</option>
            <option value="6">Dukati</option>
            <option value="7">North</option>
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 mb-4">
        <div>
          <label
            htmlFor="fees"
            className="block text-gray-700 text-sm font-medium"
          >
            License Fees:
          </label>
          <select
            id="fees"
            name="fees"
            value={formData.fees}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Fees Status..</option>
            <option value="1">Paid</option>
            <option value="2">Unpaid</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="active"
            className="block text-gray-700 text-sm font-medium"
          >
            Licensee Status:
          </label>
          <select
            id="active"
            name="active"
            value={formData.active}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Status..</option>
            <option value="1">Active</option>
            <option value="0">Not active</option>
          </select>
        </div>
      </div>

      {/* Previous License Details Section */}
      <div className={styles.presection}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="previousLicense"
            checked={formData.previousLicense}
            onChange={handleChange}
            className={styles.checkbox}
          />
          Do you have any previous license details?
        </label>

        {formData.previousLicense && (
          <div className={styles.container}>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 mb-4">
              <div>
                <label
                  htmlFor="pre_company_name"
                  className="block text-gray-700 text-sm font-medium"
                >
                  Name Of Company:
                </label>
                <input
                  type="text"
                  id="pre_company_name"
                  name="pre_company_name"
                  value={formData.pre_company_name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="licensee_name"
                  className="block text-gray-700 text-sm font-medium"
                >
                  Licensee Name:
                </label>
                <input
                  type="text"
                  id="licensee_name"
                  name="licensee_name"
                  value={formData.licensee_name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="contact_number"
                  className="block text-gray-700 text-sm font-medium"
                >
                  Contact Number:
                </label>
                <input
                  type="text"
                  id="contact_number"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div className={styles.tableSection}>
              <h3 className={styles.subHeading}>
                Previous Bores/Wells/Tube Wells Details
              </h3>
              {formData.pbwd_row.map((pbwd, index) => (
                <div key={`${pbwd.id}-${index}`}>
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 mb-4">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-gray-700 text-sm font-medium"
                      >
                        Number of Bores:
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={pbwd.number_of_bore_well}
                        onChange={(e) =>
                          handleRowChange(e, index, "number_of_bore_well")
                        }
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-gray-700 text-sm font-medium"
                      >
                        GPS Location:
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={pbwd.gps_location_pb}
                        onChange={(e) =>
                          handleRowChange(e, index, "gps_location_pb")
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addRow((identifier = "pbwd_id"), {
                    gps_location_pg: "",
                    number_of_bore_well: "",
                  })
                }
                className={styles.addButton}
              >
                <MdAddCircleOutline /> Add More
              </button>
              <h3 className={styles.subHeading}>
                Previous Ground Water Network Details
              </h3>
              {formData.pgwd_row.map((pgwnd, index) => (
                <div key={`${pgwnd.id}-${index}`} >
                    <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 mb-4">
                    <div>
                    <label className="block text-gray-700 text-sm font-medium">Dia of Pipe:</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      name="sizeofborep" // This should match the property name in pgwd
                      value={pgwnd.sizeofborep}
                      onChange={(e) => handleRowChange(e, index, "sizeofborep")}
                    />
                    </div>

                    <div>
                    <label className="block text-gray-700 text-sm font-medium">Volume Of Storage:</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      name="volumestoragep"
                      value={pgwnd.volumestoragep}
                      onChange={(e) =>
                        handleRowChange(e, index, "volumestoragep")
                      }
                    />
                    </div>
                    <div>
                    <label className="block text-gray-700 text-sm font-medium">GPS Location</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      name="gps_location_pg"
                      value={pgwnd.gps_location_pg}
                      onChange={(e) =>
                        handleRowChange(e, index, "gps_location_pg")
                      }
                    />
                    </div>
                  </div>
                  
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  addRow((identifier = "pgwd_id"), {
                    sizeofborep: "",
                    volumestoragep: "",
                    gps_location_pg: "",
                  })
                }
                className={styles.addButton}
              >
                <MdAddCircleOutline /> Add More
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={styles.tableSection}>
        <h3 className={styles.subHeading}>
          Applied Ground Water Network Details
        </h3>

        {formData.agwd_row.map((agwnd, index) => (
          <div key={`${agwnd.id}-${index}`} className={styles.row}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className={styles.label1}>Dia of Pipe</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                name="sizeofboreap"
                value={agwnd.sizeofboreap}
                onChange={(e) => handleRowChange(e, index, "sizeofboreap")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className={styles.label1}>Volume Of Storage</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                name="volumestorageap"
                value={agwnd.volumestorageap}
                onChange={(e) => handleRowChange(e, index, "volumestorageap")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className={styles.label1}>GPS Location</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                name="gps_location_ap"
                value={agwnd.gps_location_ap}
                onChange={(e) => handleRowChange(e, index, "gps_location_ap")}
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            addRow({
              sizeofboreap: "",
              volumestorageap: "",
              gps_location_ap: "",
            })
          }
          className={styles.addButton}
        >
          <MdAddCircleOutline /> Add More
        </button>

        <h3 className={styles.subHeading}>Details of Current Bores</h3>
        {formData.dcb_row.map((dcb, index) => (
          <div key={`${dcb.id}-${index}`} className={styles.row}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className={styles.label1}>Number of Bores</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={dcb.number_of_bores}
                onChange={(e) => handleRowChange(e, index, "number_of_bores")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className={styles.label1}>Size of Pipe</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={dcb.size_of_pipe}
                onChange={(e) => handleRowChange(e, index, "size_of_pipe")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className={styles.label1}>Depth/Volume of Storage</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={dcb.depth_volume_storage}
                onChange={(e) =>
                  handleRowChange(e, index, "depth_volume_storage")
                }
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className={styles.label1}>
                Discharge of Bore per Month
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={dcb.discharge_per_month}
                onChange={(e) =>
                  handleRowChange(e, index, "discharge_per_month")
                }
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className={styles.label1}>GPS Location</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={dcb.gps_location_cb}
                onChange={(e) => handleRowChange(e, index, "gps_location_cb")}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addRow((identifier = "dcb_id"), {
              number_of_bores: "",
              size_of_pipe: "",
              depth_volume_storage: "",
              discharge_per_month: "",
              gps_location_cb: "",
            })
          }
          className={styles.addButton}
        >
          <MdAddCircleOutline /> Add More
        </button>

        <h3 className={styles.subHeading}>Details of Motor / Pump</h3>
        {formData.dm_row.map((dmp, index) => (
          <div key={`${dmp.id}-${index}`} className={styles.row}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className={styles.label1}>Number of Motor / Pumps</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={dmp.number_of_pumps}
                onChange={(e) => handleRowChange(e, index, "number_of_pumps")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className={styles.label1}>R/O Plant</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={dmp.ro_plant}
                onChange={(e) => handleRowChange(e, index, "ro_plant")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className={styles.label1}>Pump Make / Type</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={dmp.pump_make}
                onChange={(e) => handleRowChange(e, index, "pump_make")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className={styles.label1}>Power of Motor in HP</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={dmp.power_of_motor}
                onChange={(e) => handleRowChange(e, index, "power_of_motor")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className={styles.label1}>Discharge in GPM</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={dmp.discharge_gpm}
                onChange={(e) => handleRowChange(e, index, "discharge_gpm")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className={styles.label1}>GPS Location</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={dmp.gps_location_md}
                onChange={(e) => handleRowChange(e, index, "gps_location_md")}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addRow((identifier = "dm_id"), {
              number_of_pumps: "",
              ro_plant: "",
              pump_make: "",
              power_of_motor: "",
              discharge_gpm: "",
              gps_location_md: "",
            })
          }
          className={styles.addButton}
        >
          <MdAddCircleOutline /> Add More
        </button>

        <h3 className={styles.subHeading}>Details of Consumer</h3>
        {formData.dc_row.map((doc, index) => (
          <div key={`${doc.id}-${index}`} className={styles.row}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className={styles.label1}>Consumer Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={doc.consumer_name}
                onChange={(e) => handleRowChange(e, index, "consumer_name")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className={styles.label1}>Quantum Supplied</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={doc.quantum_supplied}
                onChange={(e) => handleRowChange(e, index, "quantum_supplied")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className={styles.label1}>GPS Location</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={doc.gps_location_cd}
                onChange={(e) => handleRowChange(e, index, "gps_location_cd")}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addRow((identifier = "dc_id"), {
              consumer_name: "",
              quantum_supplied: "",
              gps_location_cd: "",
            })
          }
          className={styles.addButton}
        >
          <MdAddCircleOutline /> Add More
        </button>

        <h3 className={styles.subHeading}>
          Declaration of Water Supply Source
        </h3>
        {formData.dwss_row.map((dwss, index) => (
          <div key={`${dwss.id}-${index}`} className={styles.row}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className={styles.label1}>Source of Water</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={dwss.source_of_water}
                onChange={(e) => handleRowChange(e, index, "source_of_water")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className={styles.label1}>
                Existing Number and Size of Water Connection
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={dwss.existing_number_and_size}
                onChange={(e) =>
                  handleRowChange(e, index, "existing_number_and_size")
                }
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className={styles.label1}>
                Volume in Gallon per Month
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={dwss.Volume_in_gallon}
                onChange={(e) => handleRowChange(e, index, "Volume_in_gallon")}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addRow((identifier = "dwss_id"), {
              source_of_water: "",
              existing_number_and_size: "",
              Volume_in_gallon: "",
            })
          }
          className={styles.addButton}
        >
          <MdAddCircleOutline /> Add More
        </button>

        <h3 className={styles.subHeading}>
          Intended Quantity of Ground Water Extraction From Bores
        </h3>
        {formData.iqgwb_row.map((iqgwb, index) => (
          <div key={`${iqgwb.id}-${index}`} className={styles.row}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className={styles.label1}>Bores / Tube Wells</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={iqgwb.bore}
                onChange={(e) => handleRowChange(e, index, "bore")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className={styles.label1}>Dischare From Each Bores</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={iqgwb.discharge_from_well}
                onChange={(e) =>
                  handleRowChange(e, index, "discharge_from_well")
                }
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className={styles.label1}>TDS Value</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={iqgwb.tds_value_ppm}
                onChange={(e) => handleRowChange(e, index, "tds_value_ppm")}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addRow((identifier = "iqgwb_id"), {
              bore: "",
              discharge_from_well: "",
              tds_value_ppm: "",
            })
          }
          className={styles.addButton}
        >
          <MdAddCircleOutline /> Add More
        </button>

        <h3 className={styles.subHeading}>Details of Proposed Flow Meter</h3>
        {formData.dpfm_row.map((dpfm, index) => (
          <div key={`${dpfm.id}-${index}`} className={styles.row}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className={styles.label1}>Made</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={dpfm.made}
                onChange={(e) => handleRowChange(e, index, "made")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className={styles.label1}>Type</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={dpfm.type}
                onChange={(e) => handleRowChange(e, index, "type")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className={styles.label1}>Size</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={dpfm.size}
                onChange={(e) => handleRowChange(e, index, "size")}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addRow((identifier = "dpfm_id"), { made: "", type: "", size: "" })
          }
          className={styles.addButton}
        >
          <MdAddCircleOutline /> Add More
        </button>
      </div>
      <div className={styles.inputGroupre}>
        <label
          htmlFor="recommendations"
          className="block text-sm font-medium mb-2"
        >
          Recommendations:
        </label>
        <textarea
          id="recommendations"
          name="recommendations"
          value={formData.recommendations}
          onChange={handleChange}
          className={styles.textarea}
          required
        ></textarea>
      </div>
      <h3 className={styles.subHeading}>Add Documents</h3>
      {formData.customer_documents.map((docs, index) => (
        <div key={docs.id} className={styles.row}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <label
              htmlFor={`document_type-${index}`}
              className="block text-sm font-medium mb-2"
            >
              Document Type:
            </label>
            <select
              id={`document_type-${index}`}
              name="document_type"
              value={docs.document_type}
              onChange={(e) => handleDocumentChange(index, e)}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select Document Type</option>
              <option value="Application Form">Application Form</option>
              <option value="CNIC">CNIC</option>
              <option value="NTN Certificate">NTN CERTIFICATE</option>
              <option value="SRB Certificate">SRB CERTIFICATE</option>
              <option value="Allotment Order">Allotment Order</option>
              <option value="Tranfer Letter">Transfer Letter</option>
              <option value="Power of Attorney">Power of Attorney</option>
              <option value="NOC from concerned industrial Association">
                NOC from concerned industrial Association
              </option>
              <option value="written Request to CEO kW&SB for Category (C, D & E)">
                written Request to CEO kW&SB for Category (C, D & E)
              </option>
              <option value="No Objection Certificate of Land Owing Agency">
                No Objection Certificate of Land Owing Agency
              </option>
              <option value="Hydrological Study & Test Report">
                Hydrological Study & Test Report
              </option>
              <option value="Detail List of Consumer">
                Detail List of Consumer
              </option>
              <option value="Sanction Order">Sanction Order</option>
              <option value="Undertaking on Judicial Stamp Paper">
                Undertaking on Judicial Stamp Paper
              </option>
              <option value="Pay Order">Pay Order</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <label
              htmlFor={`image_path-${index}`}
              className="block text-sm font-medium mb-2"
            >
              Upload Document Image:
            </label>
            <input
              type="file"
              id={`image_path-${index}`}
              name="image_path"
              accept="image/*"
              multiple
              onChange={(e) => handleDocumentChange(index, e)}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </div>
      ))}

      <button type="button" onClick={addDocument} className={styles.addButton}>
        <MdAddCircleOutline /> Add Documents Here..
      </button>
      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default AddLicensee;
