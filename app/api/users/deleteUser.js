import { deleteRecordById } from "../../../models/data";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, _method } = req.body;

    if (_method !== 'DELETE') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!id) {
      return res.status(400).json({ status: 'error', message: 'User ID is required' });
    }

    try {
      await deleteRecordById('users', id);
      // Return a success response in JSON format
      return res.status(200).json({ status: 'success', message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ status: 'error', message: 'Failed to delete user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
