import '../styles/globals.css';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';

export default function RootLayout({ children }) {
  return (
    <html >
      <body className="layout">
        {/* Proveedores globales */}
        <AuthProvider>
          <LanguageProvider>
            <header>
              <Navigation />
            </header>
            <main>
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}