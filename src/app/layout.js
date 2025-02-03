import './styles/globals.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

export default function Layout({ children }) {
  return (
    <html lang="es">
      <body className="layout">
        <header>
          <Navigation />
        </header>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
