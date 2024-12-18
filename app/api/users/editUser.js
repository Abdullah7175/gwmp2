import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { executeQuery } from "../../../lib/db";

export const config = {
  api: {
    bodyParser: false, // Disables default body parsing to handle file uploads manually
  },
};

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const form = new IncomingForm({
      uploadDir: path.join(process.cwd(), 'uploads'), // Set the upload directory
      keepExtensions: true, // Keep file extension of the uploaded files
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(500).json({ error: 'Error parsing form data' });
      }

      const { username, email, phone, address, isadmin, isactive } = fields;
      const adminStatus = parseInt(isadmin[0], 10) || 0;
      const activeStatus = parseInt(isactive[0], 10) || 0;
      const imgFile = files.img ? files.img[0] : null;
      const img = imgFile ? path.basename(imgFile.filepath) : null;

      if (!username[0] || !email[0] || !phone[0] || !address[0]) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      try {
        // Construct the SQL query
        let query = `UPDATE users SET username = $1, email = $2, phone = $3, address = $4, isadmin = $5, isactive = $6`;
        let values = [username[0], email[0], phone[0], address[0], adminStatus, activeStatus];

        // If img field is provided, include it in the update
        if (img) {
          query += `, img = $7`;
          values.push(img);
        }

        // Add WHERE clause for the id
        query += ` WHERE id = $${values.length + 1}`;
        values.push(req.query.id);

        // Execute the query
        console.log('Executing query:', query, 'With values:', values);
        await executeQuery(query, values);

        return res.status(200).json({ message: 'User updated successfully' });
      } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Failed to update user' });
      }
    });
  } else {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
