import { fetchBores, fetchRecordById } from "@/app/lib/data";

export default async function handler(req, res) {
  const { cdid } = req.query;

  if (!cdid) {
    return res.status(400).json({ success: false, message: "Licensee ID is missing." });
  }

  try {
    const data = await fetchRecordById(cdid);
    const data2 = await fetchBores(cdid);
    if (!data && data2) {
      return res.status(404).json({ success: false, message: "Licensee not found." });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching licensee:", error);
    res.status(500).json({ success: false, message: "Error fetching licensee data." });
  }
}
