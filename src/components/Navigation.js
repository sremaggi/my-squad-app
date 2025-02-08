'use client'; // Necesario para usar hooks
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Para manejar la navegación "Go Back"
import { FaHome, FaUser, FaUserCircle, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { useContext } from 'react';
import { LanguageContext } from '@/context/LanguageContext';

export default function Navigation() {
    const { user } = useAuth();
    const { language, translations } = useContext(LanguageContext);
    const t = translations[language].navigation;
    const router = useRouter(); // Hook para navegar hacia atrás

    return (
        <nav className="navigation flex justify-between items-center p-4 bg-gray-800 text-white">
            {/* Contenedor izquierdo: Go Back y Logo */}
            <div className="flex items-center gap-4">
                {/* Go Back Button */}
                <button
                    onClick={() => router.back()} // Navega hacia atrás en el historial
                    className="hover:text-orange-500 transition-transform duration-300 hover:scale-125"
                >
                    <FaArrowLeft className="text-xl" /> {/* Flecha de teclado */}
                </button>
                {/* Logo */}
                <Link href="/" className="hover:text-orange-500 text-xl md:text-2xl transition-transform duration-300 hover:scale-110 font-bold">
                    {t.logo}
                </Link>
            </div>
            {/* Contenedor derecho: Botones de navegación */}
            <div className="flex gap-5 items-center flex-wrap">
                {/* Home Button */}
                <Link
                    href="/"
                    className="nav-button hover:text-orange-500 transition-transform duration-300 hover:scale-125 flex items-center"
                >
                    <FaHome className="text-xl mr-1" />
                    <span className="text-xs md:text-sm">{t.home}</span>
                </Link>
                {/* User Profile or Login Button */}
                {user ? (
                    <Link
                        href="/user"
                        className="nav-button hover:text-orange-500 transition-transform duration-300 hover:scale-125 flex items-center"
                    >
                        <img
                            src={user.photoURL}
                            alt="Foto de perfil"
                            className="w-6 h-6 rounded-full object-cover mr-1"
                        />
                        <span className="text-xs md:text-sm">{t.profile}</span>
                    </Link>
                ) : (
                    <Link
                        href="/user"
                        className="nav-button hover:text-orange-500 transition-transform duration-300 hover:scale-125 flex items-center"
                    >
                        <FaUserCircle className="text-2xl mr-1" />
                        <span className="text-xs md:text-sm">{t.login}</span>
                    </Link>
                )}
            </div>
        </nav>
    );
}