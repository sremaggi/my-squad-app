'use client'; // Necesario para usar hooks
import Link from 'next/link';
import { FaHome, FaUser, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { useContext } from 'react';
import { LanguageContext } from '@/context/LanguageContext';

export default function Navigation() {
    const { user } = useAuth();
    const { language, translations } = useContext(LanguageContext);
    const t = translations[language].navigation;

    return (
        <nav className="navigation flex justify-between items-center p-4 text-white">
            {/* Logo */}
            <div className="flex items-center text-lg font-bold">
                <Link href="/" className="hover:text-red-400 text-xl md:text-4xl">
                    {t.logo}
                </Link>
            </div>
            {/* Navigation Buttons */}
            <div className="flex gap-5 items-center">
                {/* Home Button */}
                <Link href="/" className="nav-button hover:text-red-400">
                    <FaHome className="text-xl" />
                    <span className="text-xs md:text-sm">{t.home}</span>
                </Link>
                {/* User Profile or Login Button */}
                {user ? (
                    <Link href="/user" className="nav-button hover:text-red-400">
                        <img
                            src={user.photoURL}
                            alt="Foto de perfil"
                            className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-xs md:text-sm">{t.profile}</span>
                    </Link>
                ) : (
                    <Link href="/user" className="nav-button hover:text-red-400">
                        <FaUserCircle className="text-2xl" />
                        <span className="text-xs md:text-sm">{t.login}</span>
                    </Link>
                )}

            </div>
        </nav>
    );
}