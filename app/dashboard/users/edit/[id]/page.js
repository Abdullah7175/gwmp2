"use client"; // Marks this file as a Client Component

import React, { useState, useEffect } from "react"; // Required for client-side state and effects
import { useRouter } from "next/navigation"; // Use next/navigation for routing
import Link from "next/link";

const EditUserPage = ({ params }) => {
  const { id } = React.use(params); // Unwrap params using React.use()
  const router = useRouter(); // For navigation
  const [user, setUser] = useState(null);
  const [imgPreview, setImgPreview] = useState(null); // For image preview

  // Fetch user data from the API (client-side)
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`@/app/api/fetchUsers?id=${id}`);
      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>; // Render loading state until the data is fetched
  }

  // Function to handle form submission
  const handleEdit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData(); // Create a FormData object to hold the form data
    formData.append("username", event.target.username.value || "");
    formData.append("email", event.target.email.value || "");
    formData.append("password", event.target.password.value || "");
    formData.append("phone", event.target.phone.value || "");
    formData.append("address", event.target.address.value || "");
    formData.append("isadmin", parseInt(event.target.isadmin.value));
    formData.append("isactive", parseInt(event.target.isactive.value));
  
    // Check if an image was uploaded, if so, append it to the form data
    if (event.target.img.files.length > 0) {
      formData.append("img", event.target.img.files[0]); // Appending the file object
    }

    try {
      const response = await fetch(`@/app/api/editUser?id=${id}`, {
        method: "PUT",
        body: formData,  // Send FormData object
      });

      if (response.ok) {
        router.push("/admin/users"); // Redirect after successful edit
      } else {
        console.error("Failed to update user.");
      }
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImgPreview(URL.createObjectURL(file)); // Create an image preview
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleEdit} className="space-y-6">
        <Link href="/admin/users">
          <button className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition">
            Back to Users
          </button>
        </Link>
        
        <h2 className="text-xl font-semibold">Update User Information</h2>

        <div className="flex flex-col space-y-4">
          <label>
            Username:
            <input
              name="username"
              defaultValue={user.username}
              required
              className="mt-2 p-2 border border-gray-300 rounded-md"
            />
          </label>

          <label>
            Email:
            <input
              name="email"
              type="email"
              defaultValue={user.email}
              required
              className="mt-2 p-2 border border-gray-300 rounded-md"
            />
          </label>

          <label>
            Password:
            <input
              name="password"
              type="password"
              placeholder="Enter new password (leave empty to keep current)"
              className="mt-2 p-2 border border-gray-300 rounded-md"
            />
          </label>

          <label>
            Phone:
            <input
              name="phone"
              type="text"
              defaultValue={user.phone}
              className="mt-2 p-2 border border-gray-300 rounded-md"
            />
          </label>

          <label>
            Address:
            <textarea
              name="address"
              defaultValue={user.address}
              rows="4"
              className="mt-2 p-2 border border-gray-300 rounded-md"
            />
          </label>

          <label>
            Profile Image:
            <input
              name="img"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2"
            />
            {imgPreview && <img src={imgPreview} alt="Profile preview" className="mt-2 w-24 h-24 object-cover" />}
          </label>

          <label>
            Is Admin?
            <select
              name="isadmin"
              defaultValue={user.isadmin}
              className="mt-2 p-2 border border-gray-300 rounded-md"
            >
              <option value="1">Admin</option>
              <option value="2">User</option>
            </select>
          </label>

          <label>
            Is Active?
            <select
              name="isactive"
              defaultValue={user.isactive}
              className="mt-2 p-2 border border-gray-300 rounded-md"
            >
              <option value="1">Active</option>
              <option value="2">Inactive</option>
            </select>
          </label>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserPage;
