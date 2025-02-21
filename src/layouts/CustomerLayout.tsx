import { Outlet, Link } from 'react-router-dom';
import { routes } from '../routes/index';

export const CustomerLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <nav className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <Link to={routes.home} className="text-xl font-semibold">
              Hotel Booking
            </Link>
            <div className="space-x-4">
              <Link to={routes.booking} className="text-gray-700 hover:text-gray-900">
                Reservar
              </Link>
              <Link to={routes.myBookings} className="text-gray-700 hover:text-gray-900">
                Mis reservas
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
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
