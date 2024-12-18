import Image from "next/image";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import Link from "next/link";
import { fetchPaginatedLicensees, getTotalLicenseesCount, fetchCategories } from "@/models/data";

const Licensee = async ({ page, search }) => {
  // Fetch data
  const licensees = await fetchPaginatedLicensees(page, search);
  const totalLicensees = await getTotalLicenseesCount();
  const categories = await fetchCategories();
  const currentDate = new Date();

  const getStatus = (customer) => {
    const expiryDate = new Date(customer.expiry_date);
    const isLicenseValid = expiryDate > currentDate;
    const isFeePaid = customer.fees === 1;

    return isLicenseValid && isFeePaid ? "VALID" : "NOT VALID";
  };

  const getCategoryTitle = (catid) => {
    const categoryId = parseInt(catid);
    const category = categories.find((cat) => parseInt(cat.catid) === categoryId);
    return category ? category.title : "Unknown Category";
  };

  return (
    <div className="container mx-auto p-4">
      {/* Top Section */}
      <div className="flex items-center justify-between mb-6">
        <Search placeholder="Search Licensee..." searchhere={search} />
        <Link href="/dashboard/licensee/AddLicensee">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add Licensee
          </button>
        </Link>
      </div>

      {/* Table */}
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">License Number</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Licensee Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Company Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">License Status</th>
            <th className="border border-gray-300 px-4 py-2 text-left">License Issue Date</th>
            <th className="border border-gray-300 px-4 py-2 text-left">License Category</th>
            <th className="border border-gray-300 px-4 py-2 text-left">License Expiry</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {licensees.map((customer) => (
            <tr key={customer.cdid} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{customer.cdid}</td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex items-center gap-2">
                  <Image
                    src={customer.img ? `/documents/${customer.img}` : "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span>{customer.person_name || "No Name"}</span>
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2">{customer.company_name}</td>
              <td className="border border-gray-300 px-4 py-2">
                <span
                  className={`px-2 py-1 text-sm font-semibold rounded ${
                    getStatus(customer) === "VALID" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {getStatus(customer)}
                </span>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(customer.issue_date).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">{getCategoryTitle(customer.catid)}</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(customer.expiry_date).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <Link href={`/dashboard/licensee/${customer.cdid}`}>
                  <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300">
                    VIEW
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination currentPage={page} totalItems={totalLicensees} />
    </div>
  );
};

export default Licensee;
