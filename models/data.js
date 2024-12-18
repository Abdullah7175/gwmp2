// /models/data.js
import { executeQuery } from "@/lib/db";


export const fetchPaginatedLicensees = async (page = 1, search = "") => {
  const ITEM_PER_PAGE = 10;
  const offset = (page - 1) * ITEM_PER_PAGE;

  const query = `
    SELECT * FROM customer_detail
    WHERE person_name ILIKE $1 OR company_name ILIKE $1 OR cdid ILIKE $1
    LIMIT $2 OFFSET $3
  `;
  const searchPattern = `%${search}%`;
  const values = [searchPattern, ITEM_PER_PAGE, offset];

  const result = await executeQuery(query, values);
  return result.rows;
};

export const getTotalLicenseesCount = async (search = "") => {
  const query = `
    SELECT COUNT(*) FROM customer_detail
    WHERE person_name ILIKE $1 OR company_name ILIKE $1 OR cdid ILIKE $1
  `;
  const searchPattern = `%${search}%`;
  const result = await executeQuery(query, [searchPattern]);
  return parseInt(result.rows[0].count, 10);
};

export const fetchPaginatedUser = async (page = 1, search = "") => {
  const ITEM_PER_PAGE = 10;
  const offset = (page - 1) * ITEM_PER_PAGE;

  const query = `
    SELECT * FROM users
    WHERE username ILIKE $1 OR email ILIKE $1 OR phone ILIKE $1
    LIMIT $2 OFFSET $3
  `;
  const searchPattern = `%${search}%`;
  const values = [searchPattern, ITEM_PER_PAGE, offset];

  const result = await executeQuery(query, values);
  return result.rows;
};

export const getTotaluserCount = async (search = "") => {
  const query = `
    SELECT COUNT(*) FROM users
    WHERE username ILIKE $1 OR email ILIKE $1 OR phone ILIKE $1
  `;
  const searchPattern = `%${search}%`;
  const result = await executeQuery(query, [searchPattern]);
  return parseInt(result.rows[0].count, 10);
};

export const fetchCustomer = async () => {
  const query = "SELECT * FROM customer_detail c where c.active = 1";
  const result = await executeQuery(query);
  return result.rows;
};

export const fetchgallon = async () => {
  const query = "SELECT SUM(c.gallon_req) AS gallon_sum FROM customer_detail c WHERE c.active = 1";
  const result = await executeQuery(query);
  return result.rows[0]; // Return the first row
};

export const fetchtanks = async () => {
  const query = "SELECT * FROM detail_of_ground_water_network_applied a join customer_detail b on a.cdid = b.cdid  where b.active = 1";
  const result = await executeQuery(query);
  return result.rows;
};


export const fetchborescount = async () => {
  const query = "SELECT a.cbid, a.cdid, a.number_of_bores, a.size_of_pipe, a.depth_volume_storage, a.discharge_per_month, a.gps_location_cb, a.created_at, a.updated_at FROM public.current_bores a join customer_detail b on a.cdid = b.cdid where b.active =1";
  const result = await executeQuery(query);
  return result.rows;
};

export const fetchA = async () => {
  const query = "SELECT * FROM customer_detail c where c.catid = 1 and c.active = 1";
  const result = await executeQuery(query);
  return result.rows;
};

export const fetchB= async () => {
  const query = "SELECT * FROM customer_detail c where c.catid = 2 and c.active = 1";
  const result = await executeQuery(query);
  return result.rows;
};

export const fetchC= async () => {
  const query = "SELECT * FROM customer_detail c where c.catid = 3 and c.active = 1";
  const result = await executeQuery(query);
  return result.rows;
};

export const fetchD= async () => {
  const query = "SELECT * FROM customer_detail c where c.catid = 4 and c.active = 1";
  const result = await executeQuery(query);
  return result.rows;
};

export const fetchE= async () => {
  const query = "SELECT * FROM customer_detail c where c.catid = 5 and c.active = 1";
  const result = await executeQuery(query);
  return result.rows;
};

export const fetchCategories = async () => {
  const query = "SELECT * FROM category";
  const result = await executeQuery(query);
  return result.rows;
};

export const fetchZones = async () => {
  const query = "SELECT * FROM zones";
  const result = await executeQuery(query);
  return result.rows;
};

export const fetchBores = async (cdid) => {
  const query = "SELECT cdid, number_of_bores, size_of_pipe, depth_volume_storage, discharge_per_month ,ST_X(gps_location_cb::geometry) AS lattitude, ST_Y(gps_location_cb::geometry) AS longitude FROM current_bores WHERE cdid = $1";
  const result = await executeQuery(query, [cdid]);
  return result.rows;
};

export const fetchconsumer = async (cdid) => {
  const query = "SELECT cdid, consumer_name, quantity_supplied ,ST_X(gps_location_cd::geometry) AS lattitude, ST_Y(gps_location_cd::geometry) AS longitude FROM consumer_detail WHERE cdid = $1";
  const result = await executeQuery(query, [cdid]);
  return result.rows;
};

export const fetchdocs = async (cdid) => {
  const query = "SELECT * FROM customer_documents WHERE cdid = $1";
  const result = await executeQuery(query, [cdid]);
  return result.rows;
};

export const fetchcurrentnetwork = async (cdid) => {
  const query = "SELECT cdid, sizeofboreap,volumestorageap ,ST_X(gps_location_ap::geometry) AS lattitude, ST_Y(gps_location_ap::geometry) AS longitude FROM detail_of_ground_water_network_applied WHERE cdid = $1";
  const result = await executeQuery(query, [cdid]);
  return result.rows;
};

export const fetchflowmeter = async (cdid) => {
  const query = "SELECT * FROM flow_meter WHERE cdid = $1";
  const result = await executeQuery(query, [cdid]);
  return result.rows;
};

export const fetchgroundwater = async (cdid) => {
  const query = "SELECT * FROM groundwater_extraction WHERE cdid = $1";
  const result = await executeQuery(query, [cdid]);
  return result.rows;
};

export const fetchmotordetail = async (cdid) => {
  const query = "SELECT  cdid, number_of_pumps, ro_plant, pump_make, power_of_motor, discharge_gpm ,ST_X(gps_location_md::geometry) AS lattitude, ST_Y(gps_location_md::geometry) AS longitude FROM motor_detail  WHERE cdid = $1";
  const result = await executeQuery(query, [cdid]);
  return result.rows;
};


export const fetchWatersupply = async (cdid) => {
  const query = "SELECT * FROM water_supply_source WHERE cdid = $1";
  const result = await executeQuery(query, [cdid]);
  return result.rows;
};

export const fetchprelicensedetail = async (cdid) => {
  const query = "SELECT * FROM previous_license_detail WHERE cdid = $1";
  const result = await executeQuery(query, [cdid]);

};

export const fetchPreviousBores = async (cdid) => {
  const query = "SELECT cdid, number_of_bore_well ,ST_X(gps_location_pb::geometry) AS lattitude, ST_Y(gps_location_pb::geometry) AS longitude FROM previous_bores WHERE cdid = $1";
  const result = await executeQuery(query, [cdid]);
  return result.rows;
};

export const fetchpreviousnetwork = async (cdid) => {
  const query = "SELECT cdid, sizeofborep,volumestoragep ,ST_X(gps_location_pg::geometry) AS lattitude, ST_Y(gps_location_pg::geometry) AS longitude FROM detail_of_ground_water_network_previous WHERE cdid = $1";
  const result = await executeQuery(query, [cdid]);
  return result.rows;
};


// Create or Update a record
export const createOrUpdateRecord = async (tableName, data, id = null) => {
  const columns = Object.keys(data).join(", ");
  const values = Object.values(data);
  const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");

  let query;
  if (id) {
    // Update
    const setClause = Object.keys(data).map((key, i) => `${key} = $${i + 1}`).join(", ");
    query = `UPDATE ${tableName} SET ${setClause} WHERE id = $${values.length + 1}`;
    values.push(id);
  } else {
    // Insert
    query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders}) RETURNING *`;
  }
  console.log('Executing query:', query);
  console.log('With values:', values);
  return executeQuery(query, values);
};


// Fetch all records
export const fetchRecords = async (tableName, filter = '', params = []) => {
  const query = `SELECT * FROM ${tableName} WHERE ${filter}`;
  return executeQuery(query, params);
};

// Fetch a single record by ID
export const fetchRecordById = async (tableName, cdid) => {
  const query = `SELECT * FROM ${tableName} WHERE cdid = $1`;
  const result = await executeQuery(query, [cdid]);
  return result.rows[0];
};

export const fetchRecordcustomer = async (cdid) => {
  const query = `select cd.cdid, cd.person_name, cd.father_name, cd.company_name, cd.current_address, cd.permanent_address, cd.cnic, cd.cnic_expiry, cd.phone, cd.email,
cd.status_of_land, cd.size_of_plot, cd.land_owning_agency, cd.ntn_number, cd.srb_number, cd.gallon_req, cd.fees, cd.recommendations, 
cd.issue_date, cd.expiry_date, cd.created_at, cd.updated_at, cd.form_number, cd.img, c.title , z.title , cd.active from customer_detail cd 
join zones z on z.zid = cd.zid 
join category c on c.catid = cd.catid 
where cd.active = 1 and cdid = $1`;
  const result = await executeQuery(query, [cdid]);
  return result.rows;
};

export const fetchUserRecordById = async (tableName, id) => {
  console.log(`Fetching user from table: ${tableName} with ID: ${id}`); // Log for debugging
  
  const query = `SELECT * FROM ${tableName} WHERE id = $1`;
  const result = await executeQuery(query, [id]);
  return result.rows[0];
};


export const fetchUsers = async (tableName, id) => {
  const query = id 
    ? `SELECT * FROM ${tableName} WHERE id = $1`
    : `SELECT * FROM ${tableName}`;
  const result = await executeQuery(query, [id]);
  return result.rows; // Ensure to return results correctly
};



// Delete a record
export const deleteRecordById = async (tableName, id) => {
  const query = `DELETE FROM ${tableName} WHERE id = $1`;
  return executeQuery(query, [id]);
};

// Validate GPS coordinates
const isValidGPS = (lat, lng) => {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
};

//--------------------------------------------------------------------------------------------------------//

// Insert data into customer_detail and get the generated cdid
export const addCustomerDetails = async (formData) => {
  const {
    catid, form_number, person_name, father_name, company_name,
    current_address, permanent_address, cnic, cnic_expiry, phone, email,
    status_of_land, size_of_plot, land_owning_agency, ntn_number, srb_number,
    gallon_req, fees, recommendations, img, zid,active
  } = formData;

  const query = `
    INSERT INTO customer_detail (
      catid, form_number, person_name, father_name, company_name,
      current_address, permanent_address, cnic, cnic_expiry, phone,
      email, status_of_land, size_of_plot, land_owning_agency,
      ntn_number, srb_number, gallon_req, fees, recommendations, img, zid,active
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
      $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
    RETURNING cdid;
  `;
  const params = [catid, form_number, person_name, father_name, company_name,
    current_address, permanent_address, cnic, cnic_expiry,
    phone, email, status_of_land, size_of_plot,
    land_owning_agency, ntn_number, srb_number,
    gallon_req, fees, recommendations, img, zid,active];

  const result = await executeQuery(query, params);
  return result.rows[0].cdid;
};

// Insert multiple rows into previous license detail
export const addpreviouslicensedetail = async (cdid, previouslicensedetail) => {
  const query = `
    INSERT INTO previous_license_detail (cdid, pre_company_name, licensee_name, contact_number)
    VALUES ($1, $2, $3, $4)
    RETURNING pldid;
  `;
  const params = [cdid, previouslicensedetail.pre_company_name,
    previouslicensedetail.licensee_name,
    previouslicensedetail.contact_number];
  const result = await executeQuery(query, params);
  return result;
};

// Insert multiple rows into previous bores
export const addPreviousbores = async (cdid, previousbores = []) => {
  if (!Array.isArray(previousbores) || previousbores.length === 0) return;
  if(!previousbores.length || previousbores.every(({ number_of_bore_well, gps }) => number_of_bore_well === '' && gps.lat === '' && gps.lng === '')) return;
  const values = [];
  const params = [];

  previousbores.forEach((prebore, i) => {
    // Validate GPS coordinates
    if (!isValidGPS(prebore.gps.lat, prebore.gps.lng)) {
      throw new Error(`Invalid GPS coordinates: ${prebore.gps.lat}, ${prebore.gps.lng}`);
    }
    params.push(`($${i * 3 + 1}, $${i * 3 + 2}, ST_GeographyFromText($${i * 3 + 3}))`);
    values.push(cdid, prebore.number_of_bore_well, `SRID=4326;POINT(${prebore.gps.lat} ${prebore.gps.lng})`);
  });

  const query = `
    INSERT INTO previous_bores (cdid, number_of_bore_well, gps_location_pb)
    VALUES ${params.join(", ")}
  `;

  await executeQuery(query, values);
};

// Insert multiple rows into previous ground water network
export const addPreviousgroundwater = async (cdid, previousgroundwater = []) => {
  if (!Array.isArray(previousgroundwater) || previousgroundwater.length === 0) return;
  if(!previousgroundwater.length || previousgroundwater.every(({ sizeofborep, volumestoragep, gps }) => sizeofborep === '' && volumestoragep === '' && gps.lat === '' && gps.lng === '')) return;

  const values = [];
  const params = [];
  previousgroundwater.forEach((pregw, i) => {
    // Validate GPS coordinates
    if (!isValidGPS(pregw.gps.lat, pregw.gps.lng)) {
      throw new Error(`Invalid GPS coordinates: ${pregw.gps.lat}, ${pregw.gps.lng}`);
    }
    params.push(`($${i * 4 + 1}, $${i * 4 + 2}, $${i * 4 + 3}, ST_GeographyFromText($${i * 4 + 4}))`);
    values.push(cdid, pregw.sizeofborep, pregw.volumestoragep, `SRID=4326;POINT(${pregw.gps.lat} ${pregw.gps.lng})`);
  });

  const query = `
    INSERT INTO detail_of_ground_water_network_previous (cdid, sizeofborep, volumestoragep, gps_location_pg)
    VALUES ${params.join(", ")}
  `;

  await executeQuery(query, values);
};

// Insert multiple rows into detail_of_ground_water_network_applied
export const addAppliedgroundwater = async (cdid, appliedgroundwater = []) => {
  if (!Array.isArray(appliedgroundwater) || appliedgroundwater.length === 0) return;
  if(!appliedgroundwater.length || appliedgroundwater.every(({ sizeofboreap, volumestorageap, gps }) => sizeofboreap === '' && volumestorageap === '' && gps.lat === '' && gps.lng === '')) return;


  const values = [];
  const params = [];
  appliedgroundwater.forEach((appgw, i) => {
    // Validate GPS coordinates
    if (!isValidGPS(appgw.gps.lat, appgw.gps.lng)) {
      throw new Error(`Invalid GPS coordinates: ${appgw.gps.lat}, ${appgw.gps.lng}`);
    }
    params.push(`($${i * 5 + 1}, $${i * 5 + 2}, $${i * 5 + 3}, $${i * 5 + 4})`);
    values.push(cdid, appgw.sizeofboreap, appgw.volumestorageap, `SRID=4326;POINT(${appgw.gps.lat} ${appgw.gps.lng})`);
  });

  const query = `
    INSERT INTO detail_of_ground_water_network_applied (cdid, sizeofboreap, volumestorageap, gps_location_ap)
    VALUES ${params.join(", ")}
  `;

  await executeQuery(query, values);
};


// Insert multiple rows into current_bores
export const addCurrentBores = async (cdid, currentBores = []) => {
  if (!Array.isArray(currentBores) || currentBores.length === 0) return;

  if (currentBores.every(({ number_of_bores, size_of_pipe, depth_volume_storage, discharge_per_month, gps }) => 
    number_of_bores === '' && 
    size_of_pipe === '' && 
    depth_volume_storage === '' && 
    discharge_per_month === '' && 
    gps.lat === '' && 
    gps.lng === ''
  )) {
    return;
  }

  const values = [];
  const params = [];

  currentBores.forEach((bore, i) => {
    // Validate GPS coordinates
    if (!isValidGPS(bore.gps.lat, bore.gps.lng)) {
      throw new Error(`Invalid GPS coordinates: ${bore.gps.lat}, ${bore.gps.lng}`);
    }

    params.push(`($${i * 6 + 1}, $${i * 6 + 2}, $${i * 6 + 3}, $${i * 6 + 4}, $${i * 6 + 5} , $${i * 6 + 6})`);
    values.push(
      cdid,
      bore.number_of_bores,
      bore.size_of_pipe,
      bore.depth_volume_storage,
      bore.discharge_per_month,
      `SRID=4326;POINT(${bore.gps.lat} ${bore.gps.lng})`
    );
  });

  const query = `
    INSERT INTO current_bores (cdid, number_of_bores, size_of_pipe, depth_volume_storage, discharge_per_month, gps_location_cb)
    VALUES ${params.join(", ")}
  `;

  await executeQuery(query, values);
};

// Insert multiple rows into motor details
export const addMotorDetails = async (cdid, motorDetails = []) => {
  if (!Array.isArray(motorDetails) || motorDetails.length === 0) return;
  if (motorDetails.every(({ number_of_pumps, ro_plant, pump_make, power_of_motor, discharge_gpm, gps }) => 
    number_of_pumps === '' && 
    ro_plant === '' && 
    pump_make === '' && 
    power_of_motor === '' && 
    discharge_gpm === '' && 
    gps.lat === '' && 
    gps.lng === ''
  )) {
    return;
  }

  const values = [];
  const params = [];
  motorDetails.forEach((motor, i) => {
    // Validate GPS coordinates
    if (!isValidGPS(motor.gps.lat, motor.gps.lng)) {
      throw new Error(`Invalid GPS coordinates: ${motor.gps.lat}, ${motor.gps.lng}`);
    }
    params.push(`($${i * 7 + 1}, $${i * 7 + 2}, $${i * 7 + 3}, $${i * 7 + 4}, $${i * 7 + 5}, $${i * 7 + 6}, $${i * 7 + 7})`);
    values.push(cdid, motor.number_of_pumps, motor.ro_plant, motor.pump_make, motor.power_of_motor, motor.discharge_gpm, `SRID=4326;POINT(${motor.gps.lat} ${motor.gps.lng})`);
  });

  const query = `
    INSERT INTO motor_detail (cdid, number_of_pumps, ro_plant, pump_make, power_of_motor, discharge_gpm, gps_location_md)
    VALUES ${params.join(", ")}
  `;

  await executeQuery(query, values);
};

// Insert multiple rows into consumer details
export const addConsumerDetails = async (cdid, consumerDetails = []) => {
  if (!Array.isArray(consumerDetails) || consumerDetails.length === 0) return;
  if(!consumerDetails.length || consumerDetails.every(({ consumer_name, quantity_supplied, gps }) => consumer_name === '' && quantity_supplied === '' && gps.lat === '' && gps.lng === '')) return;

  const values = [];
  const params = [];
  consumerDetails.forEach((consumer, i) => {
    // Validate GPS coordinates
    if (!isValidGPS(consumer.gps.lat, consumer.gps.lng)) {
      throw new Error(`Invalid GPS coordinates: ${consumer.gps.lat}, ${consumer.gps.lng}`);
    }
    params.push(`($${i * 4 + 1}, $${i * 4 + 2}, $${i * 4 + 3}, ST_GeographyFromText($${i * 4 + 4}))`);
    values.push(cdid, consumer.consumer_name, consumer.quantity_supplied, `SRID=4326;POINT(${consumer.gps.lat} ${consumer.gps.lng})`);
  });

  const query = `
    INSERT INTO consumer_detail (cdid, consumer_name, quantity_supplied, gps_location_cd)
    VALUES ${params.join(", ")}
  `;

  await executeQuery(query, values);
};

// Insert multiple rows into water supply source details
export const addwatersupplysource = async (cdid, watersourcedetail = []) => {
  if (!Array.isArray(watersourcedetail) || watersourcedetail.length === 0) return;
  if(!watersourcedetail.length || watersourcedetail.every(({ source_of_water, existing_number_size_connection, volume_gallons_per_month }) => source_of_water === '' && existing_number_size_connection === '' && volume_gallons_per_month === '')) return;


  const values = [];
  const params = [];
  watersourcedetail.forEach((watersupply, i) => {
    params.push(`($${i * 4 + 1}, $${i * 4 + 2}, $${i * 4 + 3}, $${i * 4 + 4})`);
    values.push(cdid, watersupply.source_of_water, watersupply.existing_number_size_connection, watersupply.volume_gallons_per_month);
  });

  const query = `
    INSERT INTO water_supply_source (cdid, source_of_water, existing_number_size_connection, volume_gallons_per_month)
    VALUES ${params.join(", ")}
  `;

  await executeQuery(query, values);
};

// Insert multiple rows into groundwater extraction details
export const addGroundwaterExtraction = async (cdid, extractionDetails = []) => {
  if (!Array.isArray(extractionDetails) || extractionDetails.length === 0) return;
  if(!extractionDetails.length || extractionDetails.every(({ bore, discharge_from_well, tds_value_ppm }) => bore === '' && discharge_from_well === '' && tds_value_ppm === '')) return;

  const values = [];
  const params = [];
  extractionDetails.forEach((groundwater, i) => {
    params.push(`($${i * 4 + 1}, $${i * 4 + 2}, $${i * 4 + 3}, $${i * 4 + 4})`);
    values.push(cdid, groundwater.bore, groundwater.discharge_from_well, groundwater.tds_value_ppm);
  });

  const query = `
    INSERT INTO groundwater_extraction (cdid, bore, discharge_from_well, tds_value_ppm)
    VALUES ${params.join(", ")}
  `;

  await executeQuery(query, values);
};

// Insert multiple rows into flow meter details
export const addFlowMeterdetail = async (cdid, flowmeterdetail = []) => {
  if (!Array.isArray(flowmeterdetail) || flowmeterdetail.length === 0) return;
  if(!flowmeterdetail.length || flowmeterdetail.every(({ make, type, size }) => make === '' && type === '' && size === '')) return;

  const values = [];
  const params = [];
  flowmeterdetail.forEach((flow, i) => {
    params.push(`($${i * 4 + 1}, $${i * 4 + 2}, $${i * 4 + 3}, $${i * 4 + 4})`);
    values.push(cdid, flow.make, flow.type, flow.size);
  });

  const query = `
    INSERT INTO flow_meter (cdid, make, type, size)
    VALUES ${params.join(", ")}
  `;

  await executeQuery(query, values);
};

// Insert multiple rows into customer documents
export const addCustomerdocuments = async (cdid, customerdocuments) => {
  console.log("customer documents api", customerdocuments);

  const values = [];
  const params = [];

  // Normalize customerdocuments to always be an array
  if (!Array.isArray(customerdocuments)) {
    if (customerdocuments) {
      customerdocuments = [customerdocuments];
    } else {
      console.error("No customer documents provided.");
      return;
    }
  }

  customerdocuments.forEach((docs, i) => {
    params.push(`($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3})`);
    values.push(cdid, docs.document_type, docs.image_path);
  });

  const query = `
    INSERT INTO customer_documents (cdid, document_type, image_path)
    VALUES ${params.join(", ")}
  `;

  console.log("Executing query:", query);
  console.log("With values:", values);

  await executeQuery(query, values);
};


