'use client'; // Necesario para usar hooks
import { useContext } from 'react';
import { LanguageContext } from '@/context/LanguageContext';
import Card from '../components/Card';
import { HomeCards } from '@/utils/homeCards';
import TitleSubtitle from '../components/TitleSubtitle';

export default function Home() {
  const { language, translations } = useContext(LanguageContext);
  const t = translations[language].home;

  return (
    <div className="p-4">
      {/* Título y subtítulo */}
      <TitleSubtitle
        title={t.title}
        subtitle={t.description}
      />

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {HomeCards.map((card, index) => (
          <Card key={index}>
            <a href={card.link} className="block">
              {/* Imagen */}
              <img
                src={card.image}
                alt={t.sections[card.titleKey]}
                className={`w-full h-48 object-cover rounded-t-lg ${card.descriptionKey === 'comingSoon' ? 'opacity-50 grayscale' : ''
                  }`}
              />
              {/* Contenido */}
              <div className="p-3">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {t.sections[card.titleKey]}
                </h3>
                <p className={`text-gray-600 ${card.descriptionKey === 'comingSoon' ? 'italic text-sm' : ''}`}>
                  {t.sections[card.descriptionKey]}
                </p>
              </div>
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
}