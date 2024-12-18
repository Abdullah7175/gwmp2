// app/admin/users/page.js
"client"
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import Image from "next/image";
import Link from "next/link";
import { fetchPaginatedUser, getTotaluserCount } from "@/models/data";
import UserActions from "./UserActions"; // Import the Client Component

const UsersPage = async ({ page, search, status, message }) => {
  const userpage = await fetchPaginatedUser(page, search);
  const totaluser = await getTotaluserCount();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Search placeholder="Search User..." searchhere={search} />
        <Link href="../../dashboard/users/AddUser">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Add User
          </button>
        </Link>
      </div>

      {status && (
        <div className={`text-center py-2 mb-4 rounded ${status === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {decodeURIComponent(message)}
        </div>
      )}

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-3 text-left text-gray-600 font-semibold">Name</th>
              <th className="px-4 py-3 text-left text-gray-600 font-semibold">Email</th>
              <th className="px-4 py-3 text-left text-gray-600 font-semibold">Created At</th>
              <th className="px-4 py-3 text-left text-gray-600 font-semibold">Role</th>
              <th className="px-4 py-3 text-left text-gray-600 font-semibold">Status</th>
              <th className="px-4 py-3 text-left text-gray-600 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {userpage.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 flex items-center space-x-3">
                  <Image
                    src={user.img ? `/public/${user.img}` : "/noavatar.png"}
                    alt="User Image"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span>{user.username || "No Name"}</span>
                </td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{new Date(user.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-3">{user.isadmin === 1 ? "Admin" : "User"}</td>
                <td className="px-4 py-3">{user.isactive === 1 ? "Active" : "Inactive"}</td>
                <td className="px-4 py-3">
                  <UserActions userId={user.id} /> {/* Use UserActions here */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={page} totalItems={totaluser} />
    </div>
  );
};

export default UsersPage;
