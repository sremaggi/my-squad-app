// src/app/User/page.js
'use client'; // Necesario para usar hooks y funciones interactivas

import { useAuth } from '../../context/AuthContext';
import { auth, provider, signInWithPopup, signOut } from '../../utils/firebase';

export default function User() {
    const { user } = useAuth(); // Acceder al estado global del usuario

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
        <div>
            <h1>User Page</h1>
            <p>Feel free to reach out to us!</p>

            {!user ? (
                <button onClick={handleGoogleLogin} style={{ padding: '10px', backgroundColor: '#4285F4', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Iniciar sesión con Google
                </button>
            ) : (
                <div style={{ marginTop: '20px' }}>
                    <h2>Bienvenido, {user.displayName}</h2>
                    <img src={user.photoURL} alt="Foto de perfil" style={{ width: '50px', borderRadius: '50%' }} />
                    <p>Email: {user.email}</p>
                    {/* Botón de cerrar sesión */}
                    <button
                        onClick={handleLogout}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Cerrar sesión
                    </button>
                </div>
            )}
        </div>
    );
}