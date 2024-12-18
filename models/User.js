// /models/User.js
import bcrypt from "bcryptjs";
import { createOrUpdateRecord, fetchUsers } from "../models/data";

// Add a new user
export const addUser = async (formData) => {
  const { username, email, password, phone, address, isAdmin, isActive, img } = formData;

  if (!password || typeof password !== 'string') {
    throw new Error('Invalid password');
  }

  // Hash password here
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const userData = { username, email, password: hashedPassword, phone, address, isAdmin, isActive, img };
  
  // Save user data in the database
  await createOrUpdateRecord('users', userData);
};

export const getUsers = async () => {
  try {
    const users = await fetchUsers('users');
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Update an existing user
// /app/lib/actions.js

export const updateUser = async (formData, id) => {
  const { username, img, email, password, phone, address, isadmin, isactive } = formData;

  let userData = {
    username,
    img,
    email,
    phone,
    address,
    isadmin: parseInt(isadmin),
    isactive: parseInt(isactive),
  };
  // If password is provided, hash it
  if (password && typeof password === 'string' && password.trim() !== '') {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    userData.password = hashedPassword;
  }

  // Update user data in the database
  await createOrUpdateRecord('users', userData, id);
};



