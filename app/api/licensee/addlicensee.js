import {
  addCustomerDetails,
  addpreviouslicensedetail,
  addPreviousbores,
  addPreviousgroundwater,
  addAppliedgroundwater,
  addCurrentBores,
  addMotorDetails,
  addConsumerDetails,
  addwatersupplysource,
  addGroundwaterExtraction,
  addFlowMeterdetail,
  addCustomerdocuments
} from '@/app/lib/data';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disable body parsing to handle multipart form data
  },
};

const parseForm = (req) =>
  new Promise((resolve, reject) => {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const form = new IncomingForm({
      multiples: true,
      uploadDir,
      keepExtensions: true,
    });

    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir, { recursive: true });
    }

    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err);
      }

      const filteredFiles = {};

      for (const key in files) {
        if (!key.startsWith('image')) {
          filteredFiles[key] = files[key];
        }
      }
      console.log(filteredFiles)
      resolve({ fields, files: filteredFiles });
    });
  });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { fields, files } = await parseForm(req); // Get form data and file uploads
      console.log(fields)


      fields.catid = parseInt(fields.catid, 10);
      fields.zid = parseInt(fields.zid, 10);
      fields.form_number = parseInt(fields.form_number, 10);
      fields.status_of_land = parseInt(fields.status_of_land, 10);
      fields.fees = parseInt(fields.fees, 10);
      fields.active = parseInt(fields.active, 10);



      fields.cnic = Array.isArray(fields.cnic) ? fields.cnic[0] : '';
      fields.phone = Array.isArray(fields.phone) ? fields.phone[0] : '';
      fields.email = Array.isArray(fields.email) ? fields.email[0] : '';
      fields.person_name = Array.isArray(fields.person_name) ? fields.person_name[0] : '';
      fields.father_name = Array.isArray(fields.father_name) ? fields.father_name[0] : '';
      fields.company_name = Array.isArray(fields.company_name) ? fields.company_name[0] : '';
      fields.current_address = Array.isArray(fields.current_address) ? fields.current_address[0] : '';
      fields.permanent_address = Array.isArray(fields.permanent_address) ? fields.permanent_address[0] : '';
      fields.size_of_plot = Array.isArray(fields.size_of_plot) ? fields.size_of_plot[0] : '';
      fields.land_owning_agency = Array.isArray(fields.land_owning_agency) ? fields.land_owning_agency[0] : '';
      fields.ntn_number = Array.isArray(fields.ntn_number) ? fields.ntn_number[0] : '';
      fields.srb_number = Array.isArray(fields.srb_number) ? fields.srb_number[0] : '';
      fields.gallon_req = Array.isArray(fields.gallon_req) ? fields.gallon_req[0] : '';
      fields.recommendations = Array.isArray(fields.recommendations) ? fields.recommendations[0] : '';
      fields.issue_date = fields.issue_date[0] !== '' ? fields.issue_date[0] : null;

      fields.customer_documents = fields.customer_documents ? JSON.parse(fields.customer_documents[0]) : [];

      //fields.previousLicense = Array.isArray(fields.previousLicense) ? fields.previousLicense[0] === 'true' : false;
      //fields.previousLicense = fields.previousLicense === 'true' || fields.previousLicense === true;
      fields.previousLicense = fields.previousLicense == 'true';



      // Handle customer details
      const customerID = await addCustomerDetails(fields);

      let lat = '';
      let lng = '';


      // Handle previous license details (if applicable)
      if (fields.previousLicense == true) {
        const previousLicenseID = await addpreviouslicensedetail(customerID, {
          pre_company_name: Array.isArray(fields.pre_company_name) ? fields.pre_company_name[0] : '',
          licensee_name: Array.isArray(fields.licensee_name) ? fields.licensee_name[0] : '',
          contact_number: Array.isArray(fields.contact_number) ? fields.contact_number[0] : '',
        });

        // Assuming previousLicenseID returns an ID, no need to call it as a function
        const previousid = previousLicenseID.rows[0].pldid ?? null;


        const addAllPreviousBores = async (fields) => {
          const previousBores = [];

          // Extracting relevant fields and parsing them from pbwd_row
          if (Array.isArray(fields.pbwd_row)) {
            const pbwdDataArray = JSON.parse(fields.pbwd_row[0]);
            pbwdDataArray.forEach(pbwdData => {
              // Assuming pbwdData contains gps_location_pb in the correct format
              const gpsLocation = (pbwdData.gps_location_pb || '').split(',').map(coord => coord.trim());
              const lat = gpsLocation[0] || '';  // Default to empty string if not available
              const lng = gpsLocation[1] || '';  // Default to empty string if not available

              previousBores.push({
                number_of_bore_well: pbwdData.number_of_bore_well || '',
                gps: {
                  lat: lat,
                  lng: lng,
                },
              });
            });
          }

          // Only call addPreviousbores with the filtered previousBores
          await addPreviousbores(customerID, previousBores);
        };

        await addAllPreviousBores(fields);

        await addPreviousbores(customerID, [{
          number_of_bore_well: Array.isArray(fields.number_of_bore_well) ? fields.number_of_bore_well[0] : '',
          gps: {
            lat: lat,
            lng: lng,
          },
        }]);

        // Insert previous ground water network details
        const addAllPreviousgroundwater = async (fields) => {
          const Previousgroundwater = [];
          // Extracting relevant fields and parsing them from pgwd_row
          if (Array.isArray(fields.pgwd_row)) {
            const pgwdDataArray = JSON.parse(fields.pgwd_row[0]);
            pgwdDataArray.forEach(pbwdData => {
              // Assuming pbwdData contains gps_location_pg in the correct format
              const gpsLocation = (pbwdData.gps_location_pg || '').split(',').map(coord => coord.trim());
              const lat = gpsLocation[0] || '';  // Default to empty string if not available
              const lng = gpsLocation[1] || '';  // Default to empty string if not available

              Previousgroundwater.push({
                sizeofborep: pbwdData.sizeofborep || '',
                volumestoragep: pbwdData.volumestoragep || '',
                gps: {
                  lat: lat,
                  lng: lng,
                },
              });
            });
          }

          // Only call addPreviousgroundwater with the filtered Previousgroundwater
          await addPreviousgroundwater(customerID, Previousgroundwater);
        };

        await addAllPreviousgroundwater(fields);

        await addPreviousgroundwater(customerID, [{
          sizeofborep: Array.isArray(fields.sizeofborep) ? fields.sizeofborep[0] : '',
          volumestoragep: Array.isArray(fields.volumestoragep) ? fields.volumestoragep[0] : '',
          gps: {
            lat: lat,
            lng: lng,
          },
        }]);
      }

      const addAllAppliedgroundwater = async (fields) => {
        const Appliedgroundwater = [];
        // Extracting relevant fields and parsing them from agwd_row
        if (Array.isArray(fields.agwd_row)) {
          const agwdDataArray = JSON.parse(fields.agwd_row[0]);
          agwdDataArray.forEach(agwdData => {
            // Assuming agwdData contains gps_location_ap in the correct format
            const gpsLocation = (agwdData.gps_location_ap || '').split(',').map(coord => coord.trim());
            const lat = gpsLocation[0] || '';  // Default to empty string if not available
            const lng = gpsLocation[1] || '';  // Default to empty string if not available

            Appliedgroundwater.push({
              sizeofboreap: agwdData.sizeofboreap || '',
              volumestorageap: agwdData.volumestorageap || '',
              gps: {
                lat: lat,
                lng: lng,
              },
            });
          });
        }

        // Only call addAppliedgroundwater with the filtered Appliedgroundwater
        await addAppliedgroundwater(customerID, Appliedgroundwater);
      };

      await addAllAppliedgroundwater(fields);

      await addAppliedgroundwater(customerID, [{
        sizeofboreap: Array.isArray(fields.sizeofboreap) ? fields.sizeofboreap[0] : '',
        volumestorageap: Array.isArray(fields.volumestorageap) ? fields.volumestorageap[0] : '',
        gps: {
          lat: lat,
          lng: lng,
        },
      }]);



      const addAllCurrentBores = async (fields) => {
        const CurrentBores = [];
        if (Array.isArray(fields.dcb_row)) {
          const dcbDataArray = JSON.parse(fields.dcb_row[0]);
          dcbDataArray.forEach(dcbData => {
            const gpsLocation = (dcbData.gps_location_cb || '').split(',').map(coord => coord.trim());
            const lat = gpsLocation[0] || '';  // Default to empty string if not available
            const lng = gpsLocation[1] || '';  // Default to empty string if not available

            CurrentBores.push({
              number_of_bores: dcbData.number_of_bores || '',
              size_of_pipe: dcbData.size_of_pipe || '',
              depth_volume_storage: dcbData.depth_volume_storage || '',
              discharge_per_month: dcbData.discharge_per_month || '',
              gps: {
                lat: lat,
                lng: lng,
              },
            });
          });
        }

        // Only call addCurrentBores with the filtered CurrentBores
        await addCurrentBores(customerID, CurrentBores);
      };

      await addAllCurrentBores(fields);

      await addCurrentBores(customerID, [{
        number_of_bores: Array.isArray(fields.number_of_bores) ? fields.number_of_bores[0] : '',
        size_of_pipe: Array.isArray(fields.size_of_pipe) ? fields.size_of_pipe[0] : '',
        depth_volume_storage: Array.isArray(fields.depth_volume_storage) ? fields.depth_volume_storage[0] : '',
        discharge_per_month: Array.isArray(fields.discharge_per_month) ? fields.discharge_per_month[0] : '',
        gps: {
          lat: lat,
          lng: lng,
        },
      }]);


      if (fields.dm_row) {

        const addAllMotorDetails = async (fields) => {
          const MotorDetails = [];
          if (Array.isArray(fields.dm_row)) {
            const dmDataArray = JSON.parse(fields.dm_row[0]);
            dmDataArray.forEach(dmData => {
              const gpsLocation = (dmData.gps_location_md || '').split(',').map(coord => coord.trim());
              const lat = gpsLocation[0] || '';  // Default to empty string if not available
              const lng = gpsLocation[1] || '';  // Default to empty string if not available

              MotorDetails.push({
                number_of_pumps: dmData.number_of_pumps || '',
                ro_plant: dmData.ro_plant || '',
                pump_make: dmData.pump_make || '',
                power_of_motor: dmData.power_of_motor || '',
                discharge_gpm: dmData.discharge_gpm || '',
                gps: {
                  lat: lat,
                  lng: lng,
                },
              });
            });
          }

          // Only call addMotorDetails with the filtered MotorDetails
          await addMotorDetails(customerID, MotorDetails);
        };

        await addAllMotorDetails(fields);

        await addMotorDetails(customerID, [{
          number_of_pumps: Array.isArray(fields.number_of_pumps) ? fields.number_of_pumps[0] : '',
          ro_plant: Array.isArray(fields.ro_plant) ? fields.ro_plant[0] : '',
          pump_make: Array.isArray(fields.pump_make) ? fields.pump_make[0] : '',
          power_of_motor: Array.isArray(fields.power_of_motor) ? fields.power_of_motor[0] : '',
          discharge_gpm: Array.isArray(fields.discharge_gpm) ? fields.discharge_gpm[0] : '',
          gps: {
            lat: lat,
            lng: lng,
          },
        }]);

      }


      const addAllConsumerDetails = async (fields) => {
        const ConsumerDetails = [];
        if (Array.isArray(fields.dc_row)) {
          const dcDataArray = JSON.parse(fields.dc_row[0]);
          dcDataArray.forEach(dcData => {
            const gpsLocation = (dcData.gps_location_cd || '').split(',').map(coord => coord.trim());
            const lat = gpsLocation[0] || '';  // Default to empty string if not available
            const lng = gpsLocation[1] || '';  // Default to empty string if not available

            ConsumerDetails.push({
              consumer_name: dcData.consumer_name || '',
              quantity_supplied: dcData.quantum_supplied || '',
              gps: {
                lat: lat,
                lng: lng,
              },
            });
          });
        }

        // Only call addConsumerDetails with the filtered ConsumerDetails
        await addConsumerDetails(customerID, ConsumerDetails);
      };

      await addAllConsumerDetails(fields);

      await addConsumerDetails(customerID, [{
        consumer_name: Array.isArray(fields.consumer_name) ? fields.consumer_name[0] : '',
        quantity_supplied: Array.isArray(fields.quantity_supplied) ? fields.quantity_supplied[0] : '',
        gps: {
          lat: lat,
          lng: lng,
        },
      }]);


      const addAllwatersupplysource = async (fields) => {
        const watersupplysource = [];
        if (Array.isArray(fields.dwss_row)) {
          const dwssDataArray = JSON.parse(fields.dwss_row[0]);
          dwssDataArray.forEach(dwssData => {
            watersupplysource.push({
              source_of_water: dwssData.source_of_water || '',
              existing_number_size_connection: dwssData.existing_number_and_size || '',
              volume_gallons_per_month: dwssData.Volume_in_gallon || '',
            });
          });
        }
        // Only call addwatersupplysource with the filtered watersupplysource
        await addwatersupplysource(customerID, watersupplysource);
      };

      await addAllwatersupplysource(fields);

      await addwatersupplysource(customerID, [{
        source_of_water: Array.isArray(fields.source_of_water) ? fields.source_of_water[0] : '',
        existing_number_size_connection: Array.isArray(fields.existing_number_size_connection) ? fields.existing_number_size_connection[0] : '',
        volume_gallons_per_month: Array.isArray(fields.volume_gallons_per_month) ? fields.volume_gallons_per_month[0] : '',
      }]);


      const addAllGroundwaterExtraction = async (fields) => {
        const GroundwaterExtraction = [];
        if (Array.isArray(fields.iqgwb_row)) {
          const iqgwbDataArray = JSON.parse(fields.iqgwb_row[0]);
          iqgwbDataArray.forEach(iqgwbData => {

            GroundwaterExtraction.push({
              bore: iqgwbData.bore || '',
              discharge_from_well: iqgwbData.discharge_from_well || '',
              tds_value_ppm: iqgwbData.tds_value_ppm || '',
            });
          });
        }

        // Only call addroundwaterExtraction with the filtered roundwaterExtraction
        await addGroundwaterExtraction(customerID, GroundwaterExtraction);
      };

      await addAllGroundwaterExtraction(fields);

      await addGroundwaterExtraction(customerID, [{
        bore: Array.isArray(fields.bore) ? fields.bore[0] : '',
        discharge_from_well: Array.isArray(fields.discharge_from_well) ? fields.discharge_from_well[0] : '',
        tds_value_ppm: Array.isArray(fields.tds_value_ppm) ? fields.tds_value_ppm[0] : '',
      }]);



      const addAllFlowMeterdetail = async (fields) => {
        const FlowMeterdetail = [];
        if (Array.isArray(fields.dpfm_row)) {
          const dpfmDataArray = JSON.parse(fields.dpfm_row[0]);
          dpfmDataArray.forEach(dpfmData => {

            FlowMeterdetail.push({
              make: dpfmData.bore || '',
              type: dpfmData.type || '',
              size: dpfmData.size || '',
            });
          });
        }

        // Only call addroundwaterExtraction with the filtered roundwaterExtraction
        await addFlowMeterdetail(customerID, FlowMeterdetail);
      };

      await addAllFlowMeterdetail(fields);

      await addFlowMeterdetail(customerID, [{
        make: Array.isArray(fields.make) ? fields.make[0] : '',
        type: Array.isArray(fields.type) ? fields.type[0] : '',
        size: Array.isArray(fields.size) ? fields.size[0] : '',
      }]);



      const parseCustomerDocuments = (data) => {
        const customerDocuments = [];
        
        // Loop through the keys in the input data
        for (const key in data) {
          // Check if the key matches the customer_documents pattern
          const match = key.match(/^customer_documents\[(\d+)\]\.(.+)$/);
          
          if (match) {
            const index = parseInt(match[1], 10); // Get the index of the document
            const field = match[2]; // Get the field name (document_type or image_path)
      
            // Ensure the customerDocuments array has enough length
            while (customerDocuments.length <= index) {
              customerDocuments.push({}); // Initialize empty objects
            }
      
            // Set the corresponding field in the document
            customerDocuments[index][field] = data[key][0]; // Assuming data[key] is an array
          }
        }
        
        return customerDocuments;
      };
      // Parse customer documents
      const customerDocs = parseCustomerDocuments(fields);
      for (let i = 0; i < customerDocs.length; i++) {
        // Ensure customerDocs[i] exists
        if (!customerDocs[i]) {
          console.log(`No customer document found at index ${i}.`);
          continue; 
        }

        const file = files[`customer_documents[${i}].image_path`];

        if (Array.isArray(file) && file.length > 0) {
          const filepath = file[0].filepath; 
          console.log('Filepath:', filepath);

          const fileName = `${file[0].newFilename}`;
          const filePath = path.join(process.cwd(), 'public/uploads', fileName);

          fs.copyFileSync(filepath, filePath); 

          customerDocs[i].image_path = `public/uploads/${fileName}`;
        } else {
          console.log(`No files found for document type: ${customerDocs[i].document_type}`);
          customerDocs[i].image_path = ''; 
        }

        await addCustomerdocuments(customerID, {
          document_type: customerDocs[i].document_type,
          image_path: customerDocs[i].image_path,
        });
      }


      res.status(200).json({ success: true, message: 'Data inserted successfully!' });
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ success: false, message: 'Data insertion failed!' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
