// app/terms/terms-of-service.js
import Link from "next/link";

const TermsOfService = () => {
  return (
    <div className="sm:flex-col md:flex-row lg:flex-row mx-auto min-h-screen bg-gradient-to-r from-kwsc-green to-kwsc-blue">
      <div className="max-w-3xl mx-auto px-6 bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Terms of Service</h1>
        <p className="text-gray-600 mb-4">
          Last updated: <span className="font-semibold">{new Date().getDate()}-{new Date().getMonth()}-{new Date().getFullYear()}</span>
        </p>
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
          1. Acceptance of Terms
        </h2>
        <p className="text-gray-600 mb-4">
          By accessing and using the Ground Water Management Portal, you
          agree to comply with and be bound by these Terms of Service. If you
          do not agree to these terms, please do not use the Portal.
        </p>
        {/* Additional sections can follow similarly */}
        <Link legacyBehavior href="/">
          <a className="text-blue-600 hover:underline mt-6 inline-block">
            Back to Home
          </a>
        </Link>
      </div>
    </div>
  );
};

export default TermsOfService;
