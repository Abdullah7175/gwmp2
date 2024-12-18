// /app/dashboard/users/[id]/page.jsx
import Image from "next/image";
import Link from "next/link";
import { fetchUserRecordById } from "@/models/data";

const SingleUserPage = async ({ params }) => {
  const { id } = params;

  // Ensure `id` is a valid number
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    return <div>Error: Invalid user ID provided.</div>; // Display error for invalid IDs
  }

  // Fetch user details by ID
  const userDetails = await fetchUserRecordById("users", numericId);
  if (!userDetails) {
    return <div>Error: User not found.</div>; // Display message if no user is found
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <Link href="/users">
        <button className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition">
          Back to Users
        </button>
      </Link>
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Image
            src={userDetails.img ? `/public/${userDetails.img}` : "/noavatar.png"}
            alt="User Avatar"
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-semibold">{userDetails.username}</h2>
      </div>
      <div className="mt-6 space-y-2">
        <p>
          <strong>Email:</strong> {userDetails.email}
        </p>
        <p>
          <strong>Phone:</strong> {userDetails.phone || "N/A"}
        </p>
        <p>
          <strong>Address:</strong> {userDetails.address || "N/A"}
        </p>
        <p>
          <strong>Role:</strong> {userDetails.isadmin === 1 ? "Admin" : "User"}
        </p>
        <p>
          <strong>Status:</strong> {userDetails.isactive === 1 ? "Active" : "Inactive"}
        </p>
      </div>
      <Link href={`/users/edit/id${id}`}>
        <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Edit User
        </button>
      </Link>
    </div>
  );
};

export default SingleUserPage;
