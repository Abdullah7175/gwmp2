
import { executeQuery } from "@/app/lib/dbutils";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { cdid, billing_month, gallonData, arrears } = req.body;

    try {
      // Calculate total volume for all bores
      const total_volume_gallons = gallonData.reduce((sum, bore) => sum + bore.gallons_utilized, 0);

      // Set rate per 1000 gallons (you may also retrieve this from your settings if it's dynamic)
      const rate_per_1000_gallons = 90.00;

      // Insert the billing record
      const { rows } = await executeQuery.query(`
        INSERT INTO billing (cdid, billing_month, total_volume_gallons, rate_per_1000_gallons, arrears, due_date)
        VALUES ($1, $2, $3, $4, $5, CURRENT_DATE + interval '30 day')
        RETURNING *;
      `, [cdid, billing_month, total_volume_gallons, rate_per_1000_gallons, arrears]);

      // Insert utilization data for each bore
      for (const bore of gallonData) {
        await executeQuery.query(`
          INSERT INTO monthly_utilization (cbid, cdid, utilization_month, gallons_utilized)
          VALUES ($1, $2, $3, $4);
        `, [bore.cbid, cdid, billing_month, bore.gallons_utilized]);
      }

      res.status(201).json({ success: true, bill: rows[0] });
    } catch (error) {
      console.error("Error generating bill:", error);
      res.status(500).json({ success: false, message: "Failed to generate bill" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
