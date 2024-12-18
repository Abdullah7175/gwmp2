// app/dashboard/licensee/[cdid]/page.js

import Image from "next/image";
import Link from "next/link";
import styles from "@/app/ui/dashboard/customer/singleCustomer/singleCustomer.module.css";
import { fetchRecordById,fetchRecordcustomer } from "@/app/lib/data";
import ClientLicenseeForm from "@/app/dashboard/licensee/[cdid]/ClientLicenseeForm";
import {
  fetchBores,
  fetchprelicensedetail,
  fetchPreviousBores,
  fetchpreviousnetwork,
  fetchWatersupply,
  fetchconsumer,
  fetchcurrentnetwork,
  fetchflowmeter,
  fetchmotordetail,
  fetchgroundwater,
  fetchdocs
} from "@/app/lib/data";

const LicenseeDetails = async ({ params }) => {
  const { cdid } = await params;

  // Fetch main customer details
  const customerDetails = await fetchRecordById("customer_detail", cdid);
  if (!customerDetails) {
    return <p>Licensee not found.</p>;
  }
  if (!customerDetails) return <p>Loading...</p>;


  // Fetch all related tables with multiple rows
  const docs = await fetchdocs(cdid) || []; // Fallback to empty array if undefined
  const groundnetwork = await fetchgroundwater(cdid) || [];
  const motorDetails = await fetchmotordetail(cdid) || [];
  const flowMeters = await fetchflowmeter(cdid) || [];
  const currentNetworks = await fetchcurrentnetwork(cdid) || [];
  const previousNetworks = await fetchpreviousnetwork(cdid) || [];
  const bores = await fetchBores(cdid) || [];
  const prebores = await fetchPreviousBores(cdid) || [];
  const consumers = await fetchconsumer(cdid) || [];
  const preLicenseDetails = await fetchprelicensedetail(cdid) || []; // Add fallback to prevent error
  const waterSupply = await fetchWatersupply(cdid) || [];

  return (
    <div className={styles.container}>
      {/* Customer Details */}
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={customerDetails.img || "/noavatar.png"} alt="" width={100} height={100} />
        </div>
        <h2>{customerDetails.person_name}</h2>
      </div>

      {/* Render Client Licensee Form */}
      <ClientLicenseeForm customerDetails={customerDetails}
      docs={docs}
      groundnetwork={groundnetwork}
      motorDetails={motorDetails}
      flowMeters={flowMeters}
      currentNetworks={currentNetworks}
      previousNetworks={previousNetworks}
      bores={bores}
      prebores={prebores}
      consumers={consumers}
      preLicenseDetails={preLicenseDetails}
      waterSupply={waterSupply}
       />
    </div>
  );
};

export default LicenseeDetails;
