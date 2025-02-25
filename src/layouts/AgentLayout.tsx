import { Outlet, Link } from 'react-router-dom';
import { routes } from '../routes/index';

export const AgentLayout = () => {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-800 text-white">
        <nav className="mt-8">
          <Link to={routes.agentDashboard} className="block px-4 py-2 hover:bg-gray-700">
            Dashboard
          </Link>
          <Link to={routes.agentHotel} className="block px-4 py-2 hover:bg-gray-700">
            Gestionar Hoteles
          </Link>
          <Link to={routes.agentBooking} className="block px-4 py-2 hover:bg-gray-700">
            Reservas
          </Link>
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
