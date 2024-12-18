// app/privacy/privacy-policy.js
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <div className="sm:flex-col md:flex-row lg:flex-row mx-auto min-h-screen bg-gradient-to-r from-kwsc-green to-kwsc-blue">
      <div className="max-w-3xl mx-auto px-6 bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-4">
          Last updated: <span className="font-semibold">{new Date().getDate()}-{new Date().getMonth()}-{new Date().getFullYear()}</span>
        </p>
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
          1. Introduction
        </h2>
        <p className="text-gray-600 mb-4">
          Karachi Water and Sewerage Corporation (KW&SC) ("we," "our," or
          "us") is committed to protecting your privacy. This Privacy Policy
          explains how we collect, use, and protect your information when you
          use the Ground Water Management Portal.
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

export default PrivacyPolicy;
