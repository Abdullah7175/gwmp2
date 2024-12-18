// In pages/api/fetchUsers.js
import { fetchUserRecordById } from "../../../models/data";

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    const user = await fetchUserRecordById("users", id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
}
