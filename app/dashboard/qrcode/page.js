"use client";
import { useState } from 'react';
import QRCode from 'qrcode';
import Image from 'next/image'; // Import for use in React components only

export default function GenerateQR() {
  const [qrCode, setQrCode] = useState('');
  const [inputData, setInputData] = useState('');
  const [currentId, setCurrentId] = useState(1);
  const [qrId, setQrId] = useState(''); // State to store the current QR ID

  // Function to generate unique ID
  const generateUniqueID = () => {
    return `GW-${String(currentId).padStart(4, '0')}`;
  };

  // Function to generate QR code with logo
  const generateQRCode = async () => {
    const id = generateUniqueID();
    console.log('Generating QR code for ID:', id); // Log ID
    setQrId(id); // Update the QR ID state

    try {
      const qrDataURL = await QRCode.toDataURL(`http://localhost:3000/dashboard/qrroute?data=${encodeURIComponent(id)}`);
      console.log('QR Code data URL generated'); // Log success

      // Create a canvas to draw the QR code and logo
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new window.Image(); // Standard HTML Image object

      img.src = qrDataURL;
      img.onload = () => {
        console.log('QR Code image loaded');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Create a hole for the logo
        ctx.globalCompositeOperation = 'destination-out';
        const holeSize = 50; // Size of the hole
        const x = (img.width - holeSize) / 2;
        const y = (img.height - holeSize) / 2;
        ctx.beginPath();
        ctx.arc(x + holeSize / 2, y + holeSize / 2, holeSize / 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over'; // Reset to default

        // Draw the logo in the center
        const logo = new window.Image(); // Standard HTML Image object
        logo.src = '/kl.png'; // Path to your logo
        logo.onload = () => {
          console.log('Logo image loaded');
          ctx.drawImage(logo, x, y, holeSize, holeSize);

          // Update QR code state
          setQrCode(canvas.toDataURL());
        };
        logo.onerror = () => {
          console.error('Error loading logo image');
        };
      };
      img.onerror = () => {
        console.error('Error loading QR code image');
      };

      // Increment the ID for the next QR code
      setCurrentId(currentId + 1);
    } catch (error) {
      console.error("Error generating QR code with logo:", error);
    }
  };

  // Function to print the QR code
  const printQRCode = () => {
    if (qrCode) {
      const printWindow = window.open('', '', 'height=600,width=800');
      printWindow.document.write('<html><head><title>Print QR Code</title></head><body>');
      printWindow.document.write(`<img src="${qrCode}" alt="QR Code" />`);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Generate QR Code</h1>
      <input
        type="text"
        className="border border-gray-300 p-2 rounded mb-4 w-full"
        placeholder="Enter data for QR Code"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      <button
        onClick={generateQRCode}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4"
      >
        Generate QR Code
      </button>
      {qrCode && (
        <>
          <div className="flex flex-col items-center mb-4">
            <div className="flex items-center mb-2">
              <Image
                className="rounded-full"
                src="/kl.png"
                alt="KWSC logo"
                width={50}
                height={50}
                priority
              />
              <h2 className="ml-2 text-lg font-medium">{qrId}</h2>
            </div>
            <img src={qrCode} alt="Generated QR Code" className="w-48 h-48 mb-4" />
          </div>
          <button
            onClick={printQRCode}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Print QR Code
          </button>
        </>
      )}
    </div>
  );
}
