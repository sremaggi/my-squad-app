'use client'; // Necesario para usar hooks

import { useContext } from 'react';
import { LanguageContext } from '@/context/LanguageContext';

export default function Home() {
  const { language, translations } = useContext(LanguageContext);
  const t = translations[language].home; // Accede a las traducciones del namespace "home"

  return (
    <div>
      <h1>{t.title}</h1>
      <p>{t.description}</p>
    </div>
  );
}