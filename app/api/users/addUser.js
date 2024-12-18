// /pages/api/addUser.js
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { addUser } from '../../../models/User';

export const config = {
  api: {
    bodyParser: false, // Disables default body parsing to handle file uploads manually
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new IncomingForm({
      uploadDir: path.join(process.cwd(), 'public/uploads'), // Absolute path to the uploads directory
      keepExtensions: true, // Keep the file extension
    });

    // Ensure the uploads directory exists
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir, { recursive: true });
    }

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(500).json({ error: 'Error parsing form data' });
      }

      //console.log('Received fields:', fields);
      //console.log('Received files:', files);

      const username = fields.username[0];
      const email = fields.email[0];
      const password = fields.password[0];
      const phone = fields.phone[0];
      const isadmin = fields.isadmin[0];
      const isactive = fields.isactive[0];
      const address = fields.address[0];
      const imgFile = files.img ? files.img[0] : null;

      // Validate and process image file
      const img = imgFile ? path.basename(imgFile.filepath) : null;

      // Ensure all required fields are present
      if (!username || !email || !password || !isadmin || !isactive) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Prepare user data to be inserted
      const userData = {
        username,
        email,
        password,
        phone,
        isAdmin: isadmin === '1' ? 1 : 2,
        isActive: isactive === '1' ? 1 : 2,
        address,
        img,
      };

      // Call the function to add the user
      try {
        await addUser(userData);
        return res.redirect(307, `/dashboard/users/AddUser?status=success&message=${encodeURIComponent('User added successfully')}`);
      } catch (error) {
        console.error('Error adding user:', error);
        return res.status(500).json({ error: 'Error adding user' });
      }
    });
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
