// /app/dashboard/users/editUser/[id]/page.jsx
"use client"; // Marks the component as a Client Component

import React, { useState, useEffect } from "react"; // Required for client-side state and effects
import { useRouter } from "next/navigation";
 // Use next/navigation instead of next/router

const EditUserPage = ({ params }) => {
  const { id } = params; // Get the user ID from params
  const router = useRouter(); // For navigation
  const [user, setUser] = useState(null);

  // Fetch user data from the API (client-side)
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`@/app/api/getUser?id=${id}`);
      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div className="text-center text-xl">Loading...</div>; // Render loading state until the data is fetched
  }

  // Function to handle form submission
  const handleEdit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch(`@app/api/editUser?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center">Edit User</h2>
      <form onSubmit={handleEdit} className="space-y-4">
        <div className="flex flex-col">
          <label className="font-medium">Username:</label>
          <input
            name="username"
            defaultValue={user.username}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Email:</label>
          <input
            name="email"
            type="email"
            defaultValue={user.email}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Phone:</label>
          <input
            name="phone"
            type="text"
            defaultValue={user.phone}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Address:</label>
          <textarea
            name="address"
            defaultValue={user.address}
            rows="4"
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Is Admin?</label>
          <select
            name="isadmin"
            defaultValue={user.isadmin}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Is Active?</label>
          <select
            name="isactive"
            defaultValue={user.isactive}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserPage;
