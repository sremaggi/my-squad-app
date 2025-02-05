'use client'; // Necesario para usar hooks
import { useContext } from 'react';
import { LanguageContext } from '@/context/LanguageContext';

export default function LanguageSwitcher() {
    const { language, translations, changeLanguage } = useContext(LanguageContext);
    const t = translations[language].common; // Accede al namespace "common"

    return (
        <div className="flex items-center justify-center gap-4">
            {/* Texto dinámico "Idioma / Language" */}
            <span className="text-gray-600 font-medium">{t.languageSelector}:</span>

            {/* Bandera de Estados Unidos */}
            <button
                onClick={() => changeLanguage('en')}
                className={`rounded-full overflow-hidden w-8 h-8 border-2 ${language === 'en' ? 'border-blue-500' : 'border-transparent'}`}
            >
                <img
                    src="https://flagcdn.com/us.svg"
                    alt="English"
                    className="w-full h-full object-cover"
                />
            </button>

            {/* Bandera de España */}
            <button
                onClick={() => changeLanguage('es')}
                className={`rounded-full overflow-hidden w-8 h-8 border-2 ${language === 'es' ? 'border-blue-500' : 'border-transparent'}`}
            >
                <img
                    src="https://flagcdn.com/es.svg"
                    alt="Español"
                    className="w-full h-full object-cover"
                />
            </button>
        </div>
    );
}