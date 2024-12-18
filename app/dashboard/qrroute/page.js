// Ensure this is a server-side component
import Image from 'next/image';
import { fetchRecordById ,fetchBores, fetchCategories, fetchZones} from "@/models/data"; // This is server-side

export const dynamic = 'force-dynamic'; // Enable dynamic fetching for this route

export default async function DetailsPage({ searchParams }) {
  const cdid = searchParams.data; // Fetch the 'data' (licensee id) from the query
  const licenseeData = await fetchRecordById("customer_detail", cdid);
  

  const categories = await fetchCategories();
  const getCategoryTitle = (catid) => {
    const categoryId = parseInt(catid);
    const category = categories.find((cat) => parseInt(cat.catid) === categoryId);

    return category ? category.title : "Unknown Category";
  };

  const zones = await fetchZones();
  const getzonetitle = (zid) => {
    const zoneid = parseInt(zid);
    const zonetitle = zones.find((zon) => parseInt(zon.zid) === zoneid);

    return zonetitle ? zonetitle.title : "Unknown Zone";
  };

  const borescount = await fetchBores(cdid);
  if (!licenseeData) {
    return <p>No data found for this licensee.</p>;
  }
  const boreCount = borescount.length;


  return (
    <div className={styles.container}>
      <Image src="/GS.svg" alt="GS Logo" className={styles['logo-left']} width={50} height={50} />
      <Image src="/kl.png" alt="KL Logo" className={styles['logo-right']} width={50} height={50} />
      <div className={styles['page-title']}>Ground Water Management Portal</div>

      {/* Licensee Information */}
      <div className={styles.card}>
        <h1 className={styles.title}>Licensee Information</h1>
        <div className={styles.info}>
          <p><strong>License Number: </strong> {licenseeData.cdid}</p>
          <p><strong>Licensee Name:</strong> {licenseeData.person_name}</p>
          <p><strong>Company Name:</strong> {licenseeData.company_name}</p>
          <p><strong>License Category: </strong>{getCategoryTitle(licenseeData.catid)}</p>
          <p><strong>License Zone:</strong> {getzonetitle(licenseeData.zid)}</p>
          <p><strong>Email:</strong> {licenseeData.email}</p>
          <p><strong>Phone:</strong> {licenseeData.phone}</p>
          <p><strong>CNIC:</strong> {licenseeData.cnic}</p>
          <p><strong>Address:</strong> {licenseeData.current_address}</p>
          <p><strong>License Status:</strong> {licenseeData.fees === 1 ? 'Valid' : 'Expired'}</p>
          <p><strong>Registered Bores:</strong> {boreCount} </p>
          
        </div>
      </div>
    </div>
  );
}
