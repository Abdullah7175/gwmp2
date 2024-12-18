// /app/admin/users/UserActions
"use client"; 

import Link from "next/link";
import Swal from "sweetalert2";


const UserActions = ({ userId }) => {
  const handleDeleteUser = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`../../api/deleteUser`, {
            method: 'POST',
            body: JSON.stringify({ id: userId, _method: 'DELETE' }),
            headers: { 'Content-Type': 'application/json' },
          });
          
          const result = await response.json();

          if (response.ok) {
            Swal.fire('Deleted!', result.message, 'success');
            window.location.reload(); // Refresh the page
          } else {
            Swal.fire('Error!', result.message || 'Failed to delete user', 'error');
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire('Error!', 'Something went wrong!', 'error');
        }
      }
    });
  };

  return (
    <div className="flex space-x-2">
      <Link href={`/admin/users/${userId}`}>
        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          VIEW
        </button>
      </Link>
      
      <button
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        onClick={handleDeleteUser}
      >
        DELETE
      </button>
    </div>
  );
};

export default UserActions;
