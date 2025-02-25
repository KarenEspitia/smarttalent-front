import { Outlet, Link } from 'react-router-dom';
import { routes } from '../routes/index';
import { useAuth } from '../context/AuthContext';

export const AgentLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-800 text-white h-screen flex flex-col">
        <nav className="mt-8 flex flex-col flex-1">
          <div>
            <Link to={routes.agentHotel} className="block px-4 py-2 hover:bg-gray-700">
              Gestionar Hoteles
            </Link>
            <Link to={routes.agentBooking} className="block px-4 py-2 hover:bg-gray-700">
              Reservas
            </Link>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2 hover:bg-gray-700 mt-auto cursor-pointer w-full text-left"
          >
            Cerrar Sesión
          </button>
        </nav>
      </aside>

      <div className="flex-1 ">
        <header className="bg-white shadow">
          <div className="p-4">
            <h1 className="text-xl font-semibold">Panel de agente</h1>
          </div>
        </header>

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
