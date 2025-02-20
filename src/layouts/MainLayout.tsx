import { Link, Outlet } from 'react-router-dom';
import { routes } from '../routes';
import { useAuth } from '../context/AuthContext';

export const MainLayout = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <nav className="mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex justify-between h-16">
            <Link to={routes.home} className="flex items-center">
              Inicio
            </Link>
            <Link to={routes.hotels} className="ml-8 flex items-center">
              Buscar Hoteles
            </Link>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <button onClick={logout} className="ml-4 text-gray-700 hover:text-gray-900">
                Cerrar Sesión
              </button>
            ) : (
              <Link to={routes.login} className="ml-4 text-gray-700 hover:text-gray-900">
                Iniciar Sesión
              </Link>
            )}
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Outlet />
      </main>
      <footer className="bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-600">© 2025 Karen Espitia</p>
        </div>
      </footer>
    </div>
  );
};
