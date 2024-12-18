// /pages/api/fetchBores.js
import { executeQuery } from "@/app/lib/dbutils";

export default async function handler(req, res) {
  try {
    const query = `SELECT cbid, longitude, latitude, cdid, number_of_bores, person_name, company_name, pump_make, power_of_motor, discharge_gpm, title,cat FROM public.customer_bore_motor_view;`;
    const bores = await executeQuery(query);

    res.status(200).json(bores || []);
   // console.log('Bores fetched from database:', bores);
  } catch (error) {
    console.error('Error fetching bores:', error);
    res.status(500).json({ error: 'Error fetching bores' });
  }
}
