// /app/dashboard/licensee/[cdid]/ClientLicenseeForm.jsx
"use client"; // Mark this component as a client component

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from  "@/components/addCustomer.module.css";
import Link from "next/link";
import QRCode from 'qrcode';

const ClientLicenseeForm = ({ customerDetails, docs, groundnetwork, motorDetails, flowMeters, currentNetworks, previousNetworks, bores, prebores, consumers, preLicenseDetails, waterSupply }) => {
  const [formData, setFormData] = useState({
    cdid: customerDetails.cdid,
    person_name: customerDetails.person_name,
    father_name: customerDetails.father_name,
    email: customerDetails.email,
    phone: customerDetails.phone,
    current_address: customerDetails.current_address,
    permanent_address: customerDetails.permanent_address,
    company_name: customerDetails.company_name,
    status_of_land: customerDetails.status_of_land,
    cnic: customerDetails.cnic,
    cnic_expiry: customerDetails.cnic_expiry,
    land_owning_agency: customerDetails.land_owning_agency,
    size_of_plot: customerDetails.size_of_plot,
    form_number: customerDetails.form_number,
    fees: customerDetails.fees,
    recommendations: customerDetails.recommendations,
    issue_date: customerDetails.issue_date,
    ntn_number: customerDetails.ntn_number,
    srb_number: customerDetails.srb_number,
    gallon_req: customerDetails.gallon_req,
    catid: customerDetails.catid,
    zid: customerDetails.zid,
    active: customerDetails.active,
    groundnetwork: groundnetwork || [],
    motorDetails: motorDetails || [],
    flowMeters: flowMeters || [],
    currentNetworks: currentNetworks || [],
    previousNetworks: previousNetworks || [],
    bores: bores || [],
    prebores: prebores || [],
    consumers: consumers || [],
    preLicenseDetails: preLicenseDetails || [],
    waterSupply: waterSupply || [],
    docs: docs || [],

  });
  const router = useRouter();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRowChange = (e, index, field, section) => {
    const value = e.target.value;
    setFormData(prevState => {
      const updatedSection = prevState[section].map((row, i) => {
        if (i === index) {
          return { ...row, [field]: value };
        }
        return row;
      });

      return { ...prevState, [section]: updatedSection };
    });
  };


  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/licensee`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Licensee updated successfully!");
      } else {
        const data = await response.json();
        alert(`Failed to update licensee: ${data.message}`);
      }
    } catch (error) {
      console.error("Error updating licensee:", error);
      alert("An error occurred while updating the licensee.");
    }
  };
  
  const handleGenerateQRCode = async () => {
    try {
      // Generate the QR code with the encoded URL (this URL will be embedded in the QR code data)
      const qrCodeUrl = `/dashboard/qrroute?data=${encodeURIComponent(customerDetails.cdid)}`;
      const qrDataURL = await QRCode.toDataURL(`http://gwmp.kwsc.gos.pk:3000${qrCodeUrl}`); // Ensure URL is fully encoded for scanning
  
      // Create a canvas element to draw the QR code and logo
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new window.Image();
      img.src = qrDataURL;
  
      img.onload = () => {
        // Set canvas size to match the QR code size
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
  
        // Add a "hole" for the logo in the center
        ctx.globalCompositeOperation = 'destination-out';
        const holeSize = 50; // Size of the hole for the logo
        const x = (img.width - holeSize) / 2;
        const y = (img.height - holeSize) / 2;
        ctx.beginPath();
        ctx.arc(x + holeSize / 2, y + holeSize / 2, holeSize / 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over'; // Reset composite mode
  
        // Draw the logo in the center
        const logo = new window.Image();
        logo.src = '/kl.png'; // Path to your logo image
        logo.onload = () => {
          ctx.drawImage(logo, x, y, holeSize, holeSize);
  
          // Convert the canvas with QR code and logo to Data URL
          const finalQRCodeURL = canvas.toDataURL();
  
          // Open a new window and display the QR code
          const qrWindow = window.open('', '_blank', 'width=500,height=500');
          if (qrWindow) {
            qrWindow.document.write(`
              <html>
                <head><title>QR Code</title></head>
                <body style="display: flex; justify-content: center; align-items: center; height: 100vh;">
                  <img src="${finalQRCodeURL}" alt="QR Code" style="max-width: 100%; height: auto;" />
                </body>
              </html>
            `);
            qrWindow.document.close();
          }
        };
        logo.onerror = () => console.error('Error loading logo image');
      };
      img.onerror = () => console.error('Error loading QR code image');
    } catch (error) {
      console.error("Error generating QR code with logo:", error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleUpdate}>
        <Link href="/dashboard/licensee">
          <button className={styles.backButton}>Back to Licensees</button>
        </Link>
        <h2 className={styles.formTitle}>View or Update Licensee Information</h2>
            <div className={styles.section}>
                <div className={styles.leftSection}>
                  <label className="block text-sm font-medium mb-2">License Category</label>
                  <select name="catid" value={formData.catid} className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"onChange={handleChange} >
                    <option value="1">Category-A</option>
                    <option value="2">Category-B</option>
                    <option value="3">Category-C</option>
                    <option value="4">Category-D</option>
                    <option value="5">Category-E</option>
                  </select>
                </div>
                <div className={styles.rightSection}>
                  <label className="block text-sm font-medium mb-2">Form Number</label>
                  <input type="number" name="form_number" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={formData.form_number} onChange={handleChange} placeholder="Enter form number" />
                </div>
            </div>
            <div className={styles.row}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <label className="block text-sm font-medium mb-2">Person Name</label>
          <input type="text" name="person_name"  className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={formData.person_name} onChange={handleChange} placeholder="Enter licensee name" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <label className="block text-sm font-medium mb-2">Father Name</label>
          <input type="text" name="father_name" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={formData.father_name} onChange={handleChange} placeholder="Enter Father name" />
        </div>
        </div>

        <div className={styles.row}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <label className="block text-sm font-medium mb-2">CNIC</label>
          <input type="text" name="cnic"  className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={formData.cnic} onChange={handleChange} placeholder="Enter CNIC" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <label className="block text-sm font-medium mb-2">CNIC Expiry</label>
          <input type="date" name="cnic_expiry" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={formData.cnic_expiry} onChange={handleChange} placeholder="CNIC Expiry" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input type="email" name="email" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={formData.email} onChange={handleChange} placeholder="Enter email address" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input type="text" name="phone"  className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" />
        </div>
        </div>

        <div className={styles.row}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <label className="block text-sm font-medium mb-2">Current Address</label>
          <textarea name="current_address" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={formData.current_address} onChange={handleChange} placeholder="Enter current address" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <label className="block text-sm font-medium mb-2">Permanent Address</label>
          <textarea name="permanent_address" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={formData.permanent_address} onChange={handleChange} placeholder="Enter Permanent address" />
        </div>
        </div>

        <div className={styles.row}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <label className="block text-sm font-medium mb-2">Company Name</label>
          <input type="text" name="company_name" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={formData.company_name} onChange={handleChange} placeholder="Enter company name" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <label className="block text-sm font-medium mb-2">Size of Plot</label>
          <input type="text" name="size_of_plot" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={formData.size_of_plot} onChange={handleChange} placeholder="Enter size of plot" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <label className="block text-sm font-medium mb-2">Land Owning Agency</label>
          <input type="text" name="land_owning_agency" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={formData.land_owning_agency} onChange={handleChange} placeholder="Enter land owning agency" />
        </div>
        </div>

        <div className={styles.row}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <label className="block text-sm font-medium mb-2">NTN Number</label>
          <input type="text" name="ntn_number" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={formData.ntn_number} onChange={handleChange} placeholder="Enter NTN number" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <label className="block text-sm font-medium mb-2">SRB Number</label>
          <input type="text" name="srb_number" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={formData.srb_number} onChange={handleChange} placeholder="Enter SRB number" maxLength={20} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <label className="block text-sm font-medium mb-2">Demand in Million Gallon Per Month</label>
          <input type="text" name="gallon_req" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={formData.gallon_req} onChange={handleChange} placeholder="Enter required gallons" />
        </div>
        </div>

        <div className={styles.row}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <label>License Issue Date</label>
          <input type="date" name="issue_date" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={formData.issue_date} onChange={handleChange} placeholder="Enter Issue Date" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <label className="block text-sm font-medium mb-2">License Fees</label>
          <select name="fees" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={formData.fees} onChange={handleChange} >
            <option value="1">Paid</option>
            <option value="0">Unpaid</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <label className="block text-sm font-medium mb-2">Status of Land</label>
          <select name="status_of_land" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={formData.status_of_land} onChange={handleChange} >
            <option value="1">Owned</option>
            <option value="0">Rental</option>
          </select>
        </div>
        </div>

        <div className={styles.row}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <label className="block text-sm font-medium mb-2">License Status</label>
          <select name="active" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={formData.active} onChange={handleChange} >
          <option value="">Select Status..</option>
          <option value="1">active</option>
          <option value="0">Not active</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <label className="block text-sm font-medium mb-2">Select Zone</label>
          <select name="zid" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={formData.zid} onChange={handleChange} >
          <option value="">Select Zone</option>
          <option value='1'>Site-I</option>
          <option value='2'>Site-II</option>
          <option value='3'>Korangi Industrial</option>
          <option value='4'>Landhi</option>
          <option value='5'>Nakati</option>
          <option value='6'>Dukati</option>
          <option value='7'>North</option>
          </select>
        </div>
        </div>

        <h3 className={styles.subHeading}>Previous License Details</h3>
        {preLicenseDetails.length > 0 ? (
          <div className={styles.table}>
            {/* Table Header */}
            <div className={styles.headerRow}>
              <div className={styles.label1}>License Number</div>
              <div className={styles.label1}>Company Name</div>
              <div className={styles.label1}>Licensee Name</div>
              <div className={styles.label1}>Contact Number</div>
            </div>

            {/* Table Rows */}
            {formData.preLicenseDetails.map((preLic, index) => (
              <div key={`${preLic.id}-${index}`} className={styles.row}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={preLic.cdid} placeholder="Add Details" disabled />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={preLic.pre_company_name} onChange={(e) => handleRowChange(e, index, 'pre_company_name', 'preLicenseDetails')} placeholder="Add Details" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={preLic.licensee_name} onChange={(e) => handleRowChange(e, index, 'licensee_name', 'preLicenseDetails')} placeholder="Add Details" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={preLic.contact_number} onChange={(e) => handleRowChange(e, index, 'contact_number', 'preLicenseDetails')} placeholder="Add Details" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.row}>No Previous License Data Available</p>
        )}

        {/* Pre-Bores Details */}
        <h3 className={styles.subHeading}>Detail of Subsoil Bores/Well/Tube Well Previous</h3>
        {prebores.length > 0 ? (
          <div className={styles.table}>
            {/* Table Header */}
            <div className={styles.headerRow}>
              <div className={styles.label1}>License Number</div>
              <div className={styles.label1}>Previous Bore</div>
              <div className={styles.label1}>Location (Latitude, Longitude)</div>
            </div>

            {/* Table Rows */}
            {formData.prebores.map((prebore, index) => (
              <div key={`${prebore.id}-${index}`} className={styles.row}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={prebore.cdid} placeholder="Add Details" disabled />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={prebore.number_of_bore_well} onChange={(e) => handleRowChange(e, index, 'number_of_bore_well', 'prebores')} placeholder="Add Details" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input
                    type="text"
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                    value={`${prebore.lattitude}`}
                    onChange={(e) => {
                      handleRowChange(e, index, 'lattitude', 'prebores');
                    }}
                    placeholder="Add Details"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input
                    type="text"
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                    value={`${prebore.longitude}`}
                    onChange={(e) => {
                      handleRowChange(e, index, 'longitude', 'prebores');
                    }}
                    placeholder="Add Details"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.row}>No Previous License Data Available</p>
        )}


        {/* Pre-ground Water Network Previous */}
        <h3 className={styles.subHeading}>Detail of Ground Water Network Previous</h3>
        {previousNetworks.length > 0 ? (
          <div className={styles.table}>
            {/* Table Header */}
            <div className={styles.headerRow}>
              <div className={styles.label1}>License Number</div>
              <div className={styles.label1}>Size of Bore</div>
              <div className={styles.label1}>Volume of Storage</div>
              <div className={styles.label1}>Location (Latitude, Longitude)</div>
            </div>

            {/* Table Rows */}
            {formData.previousNetworks.map((pren, index) => (
              <div key={`${pren.id}-${index}`} className={styles.row}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={pren.cdid} placeholder="Add Details" disabled />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={pren.sizeofborep} onChange={(e) => handleRowChange(e, index, 'sizeofborep', 'previousNetworks')} placeholder="Add Details" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={pren.volumestoragep} onChange={(e) => handleRowChange(e, index, 'volumestoragep', 'previousNetworks')} placeholder="Add Details" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input
                    type="text"
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                    value={`${pren.lattitude}`}
                    onChange={(e) => {
                      handleRowChange(e, index, 'lattitude', 'previousNetworks');
                    }}
                    placeholder="Add Details"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input
                    type="text"
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                    value={`${pren.longitude}`}
                    onChange={(e) => {
                      handleRowChange(e, index, 'longitude', 'previousNetworks');
                    }}
                    placeholder="Add Details"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.row}>No Previous License Data Available</p>
        )}

        {/* Pre-ground Water Network Details */}
        <h3 className={styles.subHeading}>Detail of Ground Water Network Applied</h3>
        {currentNetworks.length > 0 ? (
          <div className={styles.table}>
            {/* Table Header */}
            <div className={styles.headerRow}>
              <div className={styles.label1}>License Number</div>
              <div className={styles.label1}>Size of Bore</div>
              <div className={styles.label1}>Volume of Storage</div>
              <div className={styles.label1}>Location (Latitude, Longitude)</div>
            </div>

            {/* Table Rows */}
            {formData.currentNetworks.map((curn, index) => (
              <div key={`${curn.id}-${index}`} className={styles.row}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={curn.cdid} placeholder="Add Details" disabled />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={curn.sizeofboreap} onChange={(e) => handleRowChange(e, index, 'sizeofboreap', 'currentNetworks')} placeholder="Add Details" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={curn.volumestorageap} onChange={(e) => handleRowChange(e, index, 'volumestorageap', 'currentNetworks')} placeholder="Add Details" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input
                    type="text"
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                    value={`${curn.lattitude}`}
                    onChange={(e) => {
                      handleRowChange(e, index, 'lattitude', 'currentNetworks');
                    }}
                    placeholder="Add Details"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input
                    type="text"
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                    value={`${curn.longitude}`}
                    onChange={(e) => {
                      handleRowChange(e, index, 'longitude', 'currentNetworks');
                    }}
                    placeholder="Add Details"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.row}>No Previous License Data Available</p>
        )}
        {/* Current Bores */}
        <h3 className={styles.subHeading}>Detail of Bores/Tube Well</h3>
        {bores.length > 0 ? (
          <div className={styles.table}>
            {/* Table Header */}
            <div className={styles.headerRow}>
              <div className={styles.label1}>License Number</div>
              <div className={styles.label1}>Number of Bores</div>
              <div className={styles.label1}>Size of Pipe</div>
              <div className={styles.label1}>Volume of Storage</div>
              <div className={styles.label1}>Discharge per Month</div>
              <div className={styles.label1}>Location (Latitude, Longitude)</div>
            </div>

            {/* Table Rows */}
            {formData.bores.map((bore, index) => (
              <div key={`${bore.id}-${index}`} className={styles.row}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={bore.cdid} placeholder="Add Details" disabled />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={bore.number_of_bores} onChange={(e) => handleRowChange(e, index, 'number_of_bores', 'bores')} placeholder="Add Details" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={bore.size_of_pipe} onChange={(e) => handleRowChange(e, index, 'size_of_pipe', 'bores')} placeholder="Add Details" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={bore.depth_volume_storage} onChange={(e) => handleRowChange(e, index, 'depth_volume_storage', 'bores')} placeholder="Add Details" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={bore.discharge_per_month} onChange={(e) => handleRowChange(e, index, 'discharge_per_month', 'bores')} placeholder="Add Details" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input
                    type="text"
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                    value={`${bore.lattitude}`}
                    onChange={(e) => {
                      handleRowChange(e, index, 'lattitude', 'bores');
                    }}
                    placeholder="Add Details"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input
                    type="text"
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                    value={`${bore.longitude}`}
                    onChange={(e) => {
                      handleRowChange(e, index, 'longitude', 'bores');
                    }}
                    placeholder="Add Details"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.row}>No Bore Data Available</p>
        )}


        {/* Motor Details */}
        <h3 className={styles.subHeading}>Detail of Motor/Pump with Make & Capacity</h3>
        {motorDetails.length > 0 ? (
          <div className={styles.table}>
            {/* Table Header */}
            <div className={styles.headerRow}>
              <div className={styles.label1}>License Number</div>
              <div className={styles.label1}>Number of Pumps</div>
              <div className={styles.label1}>RO Plant Detail</div>
              <div className={styles.label1}>Pump Make</div>
              <div className={styles.label1}>Power of Motor</div>
              <div className={styles.label1}>Discharge of Motor</div>
              <div className={styles.label1}>Location (Latitude, Longitude)</div>
            </div>

            {/* Table Rows */}
            {formData.motorDetails.map((motor, index) => (
              <div key={`${motor.id}-${index}`} className={styles.row}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={motor.cdid} placeholder="Add Details" disabled />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={motor.number_of_pumps} onChange={(e) => handleRowChange(e, index, 'number_of_pumps', 'motorDetails')} placeholder="Add Details" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={motor.ro_plant} onChange={(e) => handleRowChange(e, index, 'ro_plant', 'motorDetails')} placeholder="Add Details" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={motor.pump_make} onChange={(e) => handleRowChange(e, index, 'pump_make', 'motorDetails')} placeholder="Add Details" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={motor.power_of_motor} onChange={(e) => handleRowChange(e, index, 'power_of_motor', 'motorDetails')} placeholder="Add Details" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={motor.discharge_gpm} onChange={(e) => handleRowChange(e, index, 'discharge_gpm', 'motorDetails')} placeholder="Add Details" />
                </div>
               
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input
                    type="text"
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                    value={`${motor.lattitude}`}
                    onChange={(e) => {
                      handleRowChange(e, index, 'lattitude', 'motorDetails');
                    }}
                    placeholder="Add Details"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input
                    type="text"
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                    value={`${motor.longitude}`}
                    onChange={(e) => {
                      handleRowChange(e, index, 'longitude', 'motorDetails');
                    }}
                    placeholder="Add Details"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.row}>No Motor Details Available</p>
        )}


        {/* Consumers */}
        <h3 className={styles.subHeading}>Detail of Consumers</h3>
        {consumers.length > 0 ? (
          <div className={styles.table}>
            {/* Table Header */}
            <div className={styles.headerRow}>
              <div className={styles.label1}>License Number</div>
              <div className={styles.label1}>Consumer Name</div>
              <div className={styles.label1}>Quantity Supplied</div>
              <div className={styles.label1}>Location (Latitude, Longitude)</div>
            </div>

            {/* Table Rows */}
            {formData.consumers.map((consumer, index) => (
              <div key={`${consumer.id}-${index}`} className={styles.row}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={consumer.cdid} placeholder="Add Details" disabled />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={consumer.consumer_name} onChange={(e) => handleRowChange(e, index, 'consumer_name', 'consumers')} placeholder="Add Details" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={consumer.quantity_supplied} onChange={(e) => handleRowChange(e, index, 'quantity_supplied', 'consumers')} placeholder="Add Details" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input
                    type="text"
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                    value={`${consumer.lattitude}`}
                    onChange={(e) => {
                      handleRowChange(e, index, 'lattitude', 'consumers');
                    }}
                    placeholder="Add Details"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input
                    type="text"
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                    value={`${consumer.longitude}`}
                    onChange={(e) => {
                      handleRowChange(e, index, 'longitude', 'consumers');
                    }}
                    placeholder="Add Details"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.row}>No Consumer Data Available</p>
        )}


        {/* Water Supply */}
        <h3 className={styles.subHeading}>Declaration of Water Supply Source</h3>
        {waterSupply.length > 0 ? (
          <div className={styles.table}>
            {/* Table Header */}
            <div className={styles.headerRow}>
              <div className={styles.label1}>License Number</div>
              <div className={styles.label1}>Source of Water</div>
              <div className={styles.label1}>Size of Connection</div>
              <div className={styles.label1}>Volume Gallons/Month</div>
            </div>

            {/* Table Rows */}
            {formData.waterSupply.map((water, index) => (
              <div key={`${water.id}-${index}`} className={styles.row}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={water.cdid} placeholder="Add Details" disabled />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={water.source_of_water} onChange={(e) => handleRowChange(e, index, 'source_of_water')} placeholder="Add Details" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={water.existing_number_size_connection} onChange={(e) => handleRowChange(e, index, 'existing_number_size_connection', 'waterSupply')} placeholder="Add Details" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={water.volume_gallons_per_month} onChange={(e) => handleRowChange(e, index, 'volume_gallons_per_month', 'waterSupply')} placeholder="Add Details" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.row}>No Water Supply Data Available</p>
        )}


        {/* Groundwater Network */}
        <h3 className={styles.subHeading}>Intended Quantity of Groundwater Extraction</h3>
        {groundnetwork.length > 0 ? (
          <div className={styles.table}>
            {/* Table Header */}
            <div className={styles.headerRow}>
              <div className={styles.label1}>License Number</div>
              <div className={styles.label1}>Bore/Well/Tube</div>
              <div className={styles.label1}>Discharge</div>
              <div className={styles.label1}>TDS Value</div>
            </div>
            {formData.groundnetwork.map((network, index) => (
              <div key={`${network.id}-${index}`} className={styles.row}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={network.cdid} placeholder="Add Details" disabled />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input
                    type="text"
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                    value={network.bore}
                    onChange={(e) => handleRowChange(e, index, 'bore', 'groundnetwork')}
                    placeholder="Add Details"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input
                    type="text"
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                    value={network.discharge_from_well}
                    onChange={(e) => handleRowChange(e, index, 'discharge_from_well', 'groundnetwork')}
                    placeholder="Add Details"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input
                    type="text"
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                    value={network.tds_value_ppm}
                    onChange={(e) => handleRowChange(e, index, 'tds_value_ppm', 'groundnetwork')}
                    placeholder="Add Details"
                  />
                </div>
              </div>
            ))}

          </div>
        ) : (
          <p className={styles.row}>No Groundwater Network Data Available</p>
        )}

        {/* Flow Meters */}
        <h3 className={styles.subHeading}>Detail of Proposed Flow Meters</h3>
        {flowMeters.length > 0 ? (
          <div className={styles.table}>
            {/* Table Header */}
            <div className={styles.headerRow}>
              <div className={styles.label1}>License Number</div>
              <div className={styles.label1}>Make</div>
              <div className={styles.label1}>Type</div>
              <div className={styles.label1}>Size</div>
            </div>

            {/* Table Rows */}
            {formData.flowMeters.map((flow, index) => (
              <div key={`${flow.id}-${index}`} className={styles.row}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={flow.cdid} placeholder="Add Details" disabled />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={flow.make} onChange={(e) => handleRowChange(e, index, 'make', 'flowMeters')} placeholder="Add Details" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={flow.type} onChange={(e) => handleRowChange(e, index, 'type', 'flowMeters')} placeholder="Add Details" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={flow.size} onChange={(e) => handleRowChange(e, index, 'size', 'flowMeters')} placeholder="Add Details" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.row}>No Flow Meter Data Available</p>
        )}

        {/* Documents */}
        <h3 className={styles.subHeading}>Documents</h3>
        {docs.length > 0 ? (
          docs.map((doc, index) => (
            <div key={doc.id} className={styles.row}>
              <p>Document Type: {doc.document_type}</p>
              <a href={doc.image_path} target="_blank" rel="noopener noreferrer">View Document</a>
            </div>
          ))
        ) : (
          <p className={styles.row}>No Documents Available</p>
        )}


        <button
          type="button"
          className={styles.backButton}
          onClick={handleGenerateQRCode}
        >
          Generate QR Code
        </button>
        <div>

        </div>

        <button className={styles.updateButton} type="submit">Update</button>
      </form>
    </div>
  );
};

export default ClientLicenseeForm;