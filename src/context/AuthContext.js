// src/context/AuthContext.js
'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import { auth, onAuthStateChanged } from '../utils/firebase';
import LoadingSpinner from '@/components/LoadingSpinner';

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
    return useContext(AuthContext);
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Estado del usuario
    const [loading, setLoading] = useState(true); // Estado de carga inicial

    useEffect(() => {
        // Escuchar cambios en la autenticación de Firebase
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Actualizar el estado del usuario
            setLoading(false); // Finalizar la carga
        });

        // Limpiar el listener cuando el componente se desmonte
        return () => unsubscribe();
    }, []);

    // Valor que se compartirá con los componentes hijos
    const value = {
        user,
    };

    // Si está cargando, muestra un indicador de carga
    if (loading) {
        return (
            <div className='flex justify-center items-center'>
                <LoadingSpinner />
            </div>
        );
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};