// src/components/Navigation.js
'use client'; // Necesario para usar hooks

import Link from 'next/link';
import { FaHome, FaUser, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

export default function Navigation() {
    const { user } = useAuth(); // Accede al estado global del usuario

    return (
        <nav className="navigation flex justify-between items-center p-4 text-white">
            {/* Logo */}
            <div className="flex items-center text-lg font-bold">
                <Link href="/" className="hover:text-red-400 text-xl md:text-4xl">
                    MY SQUAD
                </Link>
            </div>
            {/* Navigation Buttons */}
            <div className="flex gap-5 ">
                {/* Home Button */}
                <Link href="/" className="nav-button hover:text-red-400">
                    <FaHome className="text-xl" />
                    <span className="text-xs md:text-sm">Home</span>
                </Link>
                {/* User Profile or Login Button */}
                {user ? (
                    <Link href="/user" className="nav-button hover:text-red-400">
                        <img
                            src={user.photoURL}
                            alt="Foto de perfil"
                            className="w-6 h-6 rounded-full object-cover" /* Tamaño fijo */
                        />
                        <span className="text-xs md:text-sm">Profile</span>
                    </Link>
                ) : (
                    <Link href="/user" className="nav-button hover:text-red-400">
                        <FaUserCircle className="text-2xl" />
                        <span className="text-xs md:text-sm">Login</span>
                    </Link>
                )}
            </div>
        </nav>
    );
}