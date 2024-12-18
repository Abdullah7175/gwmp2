"use client";
import dynamic from 'next/dynamic';

const Map = dynamic(
  () => import('./MapComponent'), 
  { ssr: false } // Disable server-side rendering for the Leaflet component
);

export default Map;
