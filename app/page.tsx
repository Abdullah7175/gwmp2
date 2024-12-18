// /app/page.js
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className={`min-h-screen flex flex-col`}>
      <main className="flex-grow flex flex-col items-center justify-center text-center py-12">
        <Image
          className="dark:invert"
          src="/kl.png"
          alt="KW&SC logo"
          width={180}
          height={38}
          priority
        />
        <ol className="mt-8 text-gray-700 text-lg">
          <li>Welcome To</li>
          <li className="font-semibold text-2xl mt-2">Ground Water Management Portal</li>
          <li className="text-gray-500 mt-2">Karachi Water and Sewerage Corporation</li>
        </ol>
        <div className="mt-8 flex gap-4">
          <Link legacyBehavior href="/login">
            <a className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
              Login
            </a>
          </Link>
          <Link legacyBehavior href="/about">
            <a className="px-6 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition">
              About Us
            </a>
          </Link>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Karachi Water and Sewerage Corporation</p>
          <div className="mt-4">
            <Link href="/privacy" className="text-gray-300 hover:underline mx-2">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-300 hover:underline mx-2">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
