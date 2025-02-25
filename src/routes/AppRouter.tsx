import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { routes } from '.';
import { Home } from '../pages/public/Home';
import { Login } from '../pages/public/Login';
import { HotelSearch } from '../pages/public/HotelSearch';
import ProtectedRoute from '../components/guards/ProtectedRoute';
import { AgentLayout } from '../layouts/AgentLayout';
import { Dashboard } from '../pages/agent/Dashboard';
import { HotelManagement } from '../pages/agent/HotelManagement';
import { RoomManagement } from '../pages/agent/RoomManagement';
import { BookingList } from '../pages/agent/BookingList';
import { CustomerLayout } from '../layouts/CustomerLayout';
import { BookingProcess } from '../pages/customer/BookingProcess';
import { MyBookings } from '../pages/customer/MyBookings';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.hotels} element={<HotelSearch />} />
        </Route>

        <Route
          element={
            <ProtectedRoute roles={['agent']}>
              <AgentLayout />
            </ProtectedRoute>
          }
        >
          <Route path={routes.agentDashboard} element={<Dashboard />} />
          <Route path={routes.agentHotel} element={<HotelManagement />} />
          <Route
            path={`${routes.agentHotel}/:hotelId/rooms`}
            element={<RoomManagement />}
          />
          <Route path={routes.agentBooking} element={<BookingList />} />
        </Route>

        <Route
          element={
            <ProtectedRoute roles={['customer']}>
              <CustomerLayout />
            </ProtectedRoute>
          }
        >
          <Route path={routes.booking} element={<BookingProcess />} />
          <Route path={routes.myBookings} element={<MyBookings />} />
        </Route>
      </Routes>
    </Router>
  );
};
