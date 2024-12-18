// app/dashboard/user/page-wrapper.js
'use client';

import { useSearchParams } from 'next/navigation';
import AddLicensee from './page';

export default function LicenseePageWrapper() {
  const searchParams = useSearchParams();
  const rawPage = searchParams.get("page") || "1";
  const rawSearch = searchParams.get("search") || "";
  const rawStatus = searchParams.get("status") || "";
  const rawMessage = searchParams.get("message") || "";

  const page = parseInt(rawPage, 10);
  const search = decodeURIComponent(rawSearch);
  const status = decodeURIComponent(rawStatus);
  const message = decodeURIComponent(rawMessage);

  return (
    <AddLicensee
      page={page}
      search={search}
      status={status}
      message={message}
    />
  );
}
