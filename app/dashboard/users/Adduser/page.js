"use client";
import { useEffect } from "react";
import Swal from "sweetalert2";
import Link from "next/link";

const AddUserPage = ({ searchParams }) => {
  const status = searchParams?.status || "";
  const message = searchParams?.message || "";

  useEffect(() => {
    if (status && message) {
      Swal.fire({
        title: status === "success" ? "Success!" : "Error!",
        text: decodeURIComponent(message),
        icon: status === "success" ? "success" : "error",
        confirmButtonText: "OK",
      });
    }
  }, [status, message]);

  return (
    <div className="flex flex-col items-center p-6 space-y-6 bg-gray-100 rounded-md shadow-md max-w-lg mx-auto">
      <Link href="/admin/users">
        <button className="mb-4 text-white bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-md">
          Back to Users
        </button>
      </Link>
      <form action="../../api/addUser" method="POST" encType="multipart/form-data" className="w-full space-y-4">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="isadmin"
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="3">Select Role</option>
            <option value="1">Admin</option>
            <option value="2">User</option>
          </select>
          <select
            name="isactive"
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1">Active</option>
            <option value="2">Inactive</option>
          </select>
          <textarea
            name="address"
            rows="4"
            placeholder="Address"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <input
            type="file"
            name="img"
            accept="image/*"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded-md transition">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUserPage;
