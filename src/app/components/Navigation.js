import Link from 'next/link';
import { FaHome, FaInfoCircle, FaEnvelope, FaUser } from 'react-icons/fa';

export default function Navigation() {
    return (
        <nav className="flex justify-between bg-[#333] p-5 text-gray-100">
            {/* Logo */}
            <div className="flex items-center text-lg font-bold">
                <Link href="/" className="hover:text-red-400">MY SQUAD</Link>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3">
                <Link href="/" className="flex flex-col items-center text-sm md:text-base hover:text-red-400">
                    <FaHome className="text-xl md:text-2xl" />
                    <span className="text-xs md:text-lg md:block ">Home</span>
                </Link>
                <Link href="/user" className="flex flex-col items-center text-sm md:text-base hover:text-red-400">
                    <FaUser className="text-xl md:text-2xl" />
                    <span className="text-xs md:text-lg md:block">User</span>
                </Link>
            </div>
        </nav>
    );
}
