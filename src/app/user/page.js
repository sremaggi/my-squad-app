'use client'; // Necesario para usar hooks y funciones interactivas
import { useContext } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useAuth } from '../../context/AuthContext';
import { auth, provider, signInWithPopup, signOut } from '../../utils/firebase';
import Card from '../../components/Card';
import { FcGoogle } from 'react-icons/fc';
import { LanguageContext } from '@/context/LanguageContext';

export default function User() {
    const { user } = useAuth(); // Acceder al estado global del usuario
    const { language, translations } = useContext(LanguageContext);
    const t = translations[language].user;

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth); // Cierra la sesión del usuario
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <div className="flex items-center justify-center p-4">
            {/* Contenedor principal */}
            <div className="max-w-2xl w-full">
                {/* Título principal */}
                <h1 className="text-3xl text-center text-gray-800 mb-8">{t.title}</h1>
                {/* Grid de Cards */}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    {/* Card de Bienvenida o Login */}
                    <Card>
                        {!user ? (
                            <div className="text-center">
                                <h2 className="text-xl font-semibold text-gray-700 mb-4">{t.loginTitle}</h2>
                                <button
                                    onClick={handleGoogleLogin}
                                    className="w-full flex items-center justify-center gap-2 py-3 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition duration-300"
                                >
                                    <FcGoogle className="text-2xl" /> {/* Logo de Google */}
                                    <span className="font-medium">{t.signInWithGoogle}</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-center">
                                {/* Bienvenido */}
                                <h2 className="text-xl font-semibold text-gray-500 mb-2">{t.welcome}</h2>
                                {/* Nombre del usuario */}
                                <h2 className="text-xl text-gray-700 mb-4">{user.displayName}</h2>
                                {/* Imagen de perfil */}
                                <img
                                    src={user.photoURL}
                                    alt="Foto de perfil"
                                    className="w-20 h-20 rounded-full mb-4 object-cover"
                                />
                                {/* Email */}
                                <p className="text-gray-600 mb-4">{user.email}</p>
                                {/* Botón de cerrar sesión */}
                                <button
                                    onClick={handleLogout}
                                    className="w-full py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                                >
                                    {t.logout}
                                </button>
                            </div>
                        )}
                        {/* Selector de idioma */}
                        <div className="mt-6 flex justify-center">
                            <LanguageSwitcher />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}