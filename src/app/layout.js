import '../styles/globals.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { AuthProvider } from '@/context/AuthContext';

export default function Layout({ children }) {
  return (
    <html lang="es">
      <body className="layout">
        <AuthProvider>
          <header>
            <Navigation />
          </header>
          <main>
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
