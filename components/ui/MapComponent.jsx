//"use client";
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';

const MapComponent = () => {
  const mapRef = useRef(null);
  const markersRef = useRef(L.layerGroup()); // Use LayerGroup to manage markers
  const [bores, setBores] = useState([]);

  // Fetch bores data
  useEffect(() => {
    const getBores = async () => {
      try {
        const response = await fetch('@/api/fetchBores');
        const data = await response.json();
        setBores(data.rows);
      } catch (error) {
        console.error('Error fetching bores:', error);
      }
    };

    getBores();
  }, []);

  // Initialize map and manage markers
  useEffect(() => {
    if (typeof window !== 'undefined' && !mapRef.current) {
      const mapOptions = {
        center: [24.866, 67.0255],
        zoom: 11,
        scrollWheelZoom: true,
        zoomControl: true,
      };

      mapRef.current = L.map('karachiMap', mapOptions);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      L.Control.geocoder().addTo(mapRef.current);
      markersRef.current.addTo(mapRef.current);
    }

    if (mapRef.current && bores.length > 0) {
      markersRef.current.clearLayers();
      bores.forEach(bore => {
        const { latitude, longitude, person_name, company_name, number_of_bores, cdid, pump_make, power_of_motor, discharge_gpm, title, cat } = bore;

        let iconSrc;

        if (cat === "CAT - A") {
            if (number_of_bores === "BORE") iconSrc = "/BB.png";
            else if (number_of_bores === "WELL") iconSrc = "/BW.png";
            else if (number_of_bores === "PROPOSED") iconSrc = "/P.png";
          } else if (cat === "CAT - B") {
            if (number_of_bores === "BORE") iconSrc = "/B.png";
            else if (number_of_bores === "WELL") iconSrc = "/W.png";
            else if (number_of_bores === "PROPOSED") iconSrc = "/P.png";
          } else if (cat === "CAT - C") {
            if (number_of_bores === "BORE") iconSrc = "/B.png";
            else if (number_of_bores === "WELL") iconSrc = "/W.png";
            else if (number_of_bores === "PROPOSED") iconSrc = "/P.png";
          } else if (cat === "CAT - D") {
            if (number_of_bores === "BORE") iconSrc = "/B.png";
            else if (number_of_bores === "WELL") iconSrc = "/W.png";
            else if (number_of_bores === "PROPOSED") iconSrc = "/P.png";
          } 
          else if (cat === "CAT - E") {
            if (number_of_bores === "BORE") iconSrc = "/B.png";
            else if (number_of_bores === "WELL") iconSrc = "/W.png";
            else if (number_of_bores === "PROPOSED") iconSrc = "/P.png";
          } else {
            iconSrc = "/P.png"; // Default icon for other categories
          }

          const iconHtml = `
          <div style="font-size: 24px; color: red; z-index: 10;">
            <img height="50px" width="50px" src="${iconSrc}" />
          </div>
        `;

        if (!isNaN(latitude) && !isNaN(longitude) && longitude !== 0 && latitude !== 0) {
          const marker = L.marker([longitude, latitude], {
            icon: L.divIcon({
              html: iconHtml,
              className: 'custom-marker-icon',
              iconSize: [24, 24],
              iconAnchor: [12, 12],
            }),
          });

          const popupContent = <div style="font-family: Arial, sans-serif; padding: 10px; text-align: center;">
              <div style="font-size: 24px; font-weight: bold; color: #2c3e50; margin-bottom: 15px;">
                ${cdid}
              </div>
              <div style="text-align: left; line-height: 1.6;">
                <p style="margin: 8px 0;"><strong style="color: #16a085;">Licensee Name:</strong> ${person_name}</p>
                <p style="margin: 8px 0;"><strong style="color: #16a085;">Company:</strong> ${company_name}</p>
                <p style="margin: 8px 0;"><strong style="color: #16a085;">Status:</strong> ${number_of_bores}</p>
                <p style="margin: 8px 0;"><strong style="color: #16a085;">Zone:</strong> ${title}</p>
                <p style="margin: 8px 0;"><strong style="color: #16a085;">Category:</strong> ${cat}</p>
                <p style="margin: 8px 0; padding: 10px; text-align: center;"><strong style="color: #16a085;">Motor Details</strong></p>
                <p style="margin: 8px 0;"><strong style="color: #16a085;">Make:</strong> ${pump_make}</p>
                <p style="margin: 8px 0;"><strong style="color: #16a085;">Power:</strong> ${power_of_motor}</p>
                <p style="margin: 8px 0;"><strong style="color: #16a085;">Discharge:</strong> ${discharge_gpm}</p>
              </div>
            </div>
          ;  // your popup HTML content

          marker.bindPopup(popupContent);
          markersRef.current.addLayer(marker);
        } else {
            console.error('Invalid coordinates for marker:', { latitude, longitude });
        }
      });
    }
  }, [bores]);

  return (
    <div className="relative h-[400px]">
      <div
        id="karachiMap"
        className="h-[400px] rounded-sm"
      ></div>
    </div>
  );
};

export default MapComponent;
