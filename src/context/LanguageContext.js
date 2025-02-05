'use client'

import { createContext, useState, useEffect } from 'react';

// Cargar los archivos de traducción
const translations = {
    en: require('../locales/en.json'),
    es: require('../locales/es.json')
};

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('es'); // Idioma predeterminado

    // Función para cambiar el idioma
    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage); // Guardar el idioma en localStorage
    };

    // Cargar el idioma guardado al iniciar la aplicación
    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
    }, []);

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, translations }}>
            {children}
        </LanguageContext.Provider>
    );
};