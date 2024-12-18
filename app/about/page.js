// pages/about-us.js
import Link from "next/link";

const AboutUs = () => {
  return (
    <div className="sm:flex-col md:flex-row lg:flex-row mx-auto min-h-screen bg-gradient-to-r from-kwsc-green to-kwsc-blue">
      <div className="max-w-4xl mx-auto px-6 bg-white shadow-md rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          At the <span className="font-semibold">Karachi Water & Sewerage Corporation</span>, we are dedicated to
          providing essential services to one of the largest and most vibrant cities in the world—
          <span className="font-semibold">Karachi</span>. Serving a population of over 20 million residents, we manage the entire water cycle, from the production of bulk water to its distribution across the city. Our services also include the treatment and disposal of wastewater, ensuring that our community stays clean and healthy.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          As the economic powerhouse of Pakistan, Karachi contributes approximately 70% of the nation’s revenue,
          and we take pride in supporting this dynamic city by maintaining a reliable water supply and ensuring
          the efficient collection of water tariffs. Our mission is to deliver sustainable, high-quality water and
          wastewater management services that improve the quality of life for every citizen, while also
          safeguarding the environment.
        </p>
        <Link legacyBehavior href="/">
          <a className="text-blue-600 hover:underline mt-6 inline-block">Back to Home</a>
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
