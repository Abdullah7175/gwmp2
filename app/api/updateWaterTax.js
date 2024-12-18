
import { executeQuery } from "@/app/lib/dbutils";

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { wtid, rate, description, status } = req.body;

    try {
      const { rows } = await executeQuery.query(`
        UPDATE water_tax
        SET rate = $1, description = $2, status = $3, updated_at = CURRENT_TIMESTAMP
        WHERE wtid = $4
        RETURNING *;
      `, [rate, description, status, wtid]);

      res.status(200).json({ success: true, waterTax: rows[0] });
    } catch (error) {
      console.error("Error updating water tax:", error);
      res.status(500).json({ success: false, message: "Failed to update water tax" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
