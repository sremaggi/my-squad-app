// src/components/Navigation.js
'use client'; // Necesario para usar hooks

import Link from 'next/link';
import { FaHome, FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

export default function Navigation() {
    const { user } = useAuth(); // Accede al estado global del usuario

    return (
        <nav className="navigation flex justify-between items-center p-4 bg-gray-800 text-white">
            {/* Logo */}
            <div className="flex items-center text-lg font-bold">
                <Link href="/" className="hover:text-red-400 text-xl md:text-4xl">
                    MY SQUAD
                </Link>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3 items-center">
                {/* Home Button */}
                <Link href="/" className="flex flex-col items-center hover:text-red-400">
                    <FaHome className="icon-size" />
                    <span className="text-xs md:text-sm">Home</span>
                </Link>

                {/* User Profile or Login Button */}
                {user ? (
                    // Si el usuario está logueado, muestra su foto de perfil
                    <Link href="/user" className="flex flex-col items-center hover:text-red-400">
                        <img
                            src={user.photoURL}
                            alt="Foto de perfil"
                            className="icon-size rounded-full object-cover"
                        />
                        <span className="text-xs md:text-sm">Perfil</span>
                    </Link>
                ) : (
                    // Si el usuario no está logueado, muestra el ícono de usuario
                    <Link href="/user" className="flex flex-col items-center hover:text-red-400">
                        <FaUser className="icon-size" />
                        <span className="text-xs md:text-sm">Login</span>
                    </Link>
                )}
            </div>
        </nav>
    );
}