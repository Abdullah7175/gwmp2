import { fetchRecordById, createOrUpdateRecord } from "@/app/lib/data";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      cdid, catid, form_number, person_name, father_name, company_name,
      current_address, permanent_address, cnic, cnic_expiry, phone, email,
      status_of_land, size_of_plot, land_owning_agency, ntn_number, srb_number,
      gallon_req, fees, recommendations, img, waterSupply, preLicenseDetails,
      consumers, prebores, bores, previousNetworks, currentNetworks, flowMeters,
      motorDetails, groundnetwork
    } = req.body;
    try {
      // Fetch existing record to prevent null constraint violations for required fields
      const existingRecord = await fetchRecordById("customer_detail", cdid);
      if (!existingRecord) {
        return res.status(404).json({ success: false, message: "Licensee not found." });
      }
      // Prepare the updated data, using the existing values for fields not provided
      const updatedCustomerData = {
        catid: catid || existingRecord.catid,
        form_number: form_number || existingRecord.form_number,
        person_name: person_name || existingRecord.person_name,
        father_name: father_name || existingRecord.father_name, // Ensure required fields are not set to null
        company_name: company_name || existingRecord.company_name,
        current_address: current_address || existingRecord.current_address,
        permanent_address: permanent_address || existingRecord.permanent_address,
        cnic: cnic || existingRecord.cnic,
        cnic_expiry: cnic_expiry || existingRecord.cnic_expiry,
        phone: phone || existingRecord.phone,
        email: email || existingRecord.email,
        status_of_land: status_of_land || existingRecord.status_of_land,
        size_of_plot: size_of_plot || existingRecord.size_of_plot,
        land_owning_agency: land_owning_agency || existingRecord.land_owning_agency,
        ntn_number: ntn_number || existingRecord.ntn_number,
        srb_number: srb_number || existingRecord.srb_number,
        gallon_req: gallon_req || existingRecord.gallon_req,
        fees: fees || existingRecord.fees,
        recommendations: recommendations || existingRecord.recommendations,
        img: img || existingRecord.img,
      };

      const processRecords = async (details, tableName, idField, locationKey) => {
        await Promise.all(details.map(async (detail) => {
          const updatedDetail = { ...detail };

          if (updatedDetail.lattitude !== undefined && updatedDetail.longitude !== undefined) {
            const location = `${updatedDetail.lattitude} ${updatedDetail.longitude}`;
            updatedDetail[locationKey] = `SRID=4326;POINT(${location})`;
            delete updatedDetail.lattitude; 
            delete updatedDetail.longitude;
          }

          await createOrUpdateRecord(tableName, updatedDetail, idField, detail[idField]);
        }));
      };

      if (preLicenseDetails) {
        await processRecords(preLicenseDetails, "previous_license_detail", 'pldid');
      }

      if (prebores) {
        await processRecords(prebores, "previous_bores", 'pbid', 'gps_location_pb');
      }

      if (previousNetworks) {
        await processRecords(previousNetworks, "detail_of_ground_water_network_previous", 'dgwnid', 'gps_location_pg');
      }

      if (currentNetworks) {
        await processRecords(currentNetworks, "detail_of_ground_water_network_applied", 'dgwncid', 'gps_location_ap');
      }

      if (consumers) {
        await processRecords(consumers, "consumer_detail", 'conid', 'gps_location_cd');
      }

      if (bores) {
        await processRecords(bores, "current_bores", 'cbid', 'gps_location_cb');
      }

      if (motorDetails) {
        await processRecords(motorDetails, "motor_detail", 'mdid', 'gps_location_md');
      }

      if (waterSupply) {
        await processRecords(waterSupply, "water_supply_source", 'wsid');
      }

      if (groundnetwork) {
        await processRecords(groundnetwork, "groundwater_extraction", 'qweid');
      }

      if (flowMeters) {
        await processRecords(flowMeters, "flow_meter", 'fmid');
      }

      // Update the record in the database
      await createOrUpdateRecord("customer_detail", updatedCustomerData, 'cdid', cdid);

      res.status(200).json({ success: true, message: "Licensee updated successfully!" });
    } catch (error) {
      console.error('Error updating licensee:', error);
      res.status(500).json({ success: false, message: "Failed to update licensee." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
