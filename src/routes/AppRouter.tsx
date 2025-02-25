import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { routes } from '.';
import { Login } from '../pages/public/Login';
import { HotelSearch } from '../pages/public/HotelSearch';
import ProtectedRoute from '../components/guards/ProtectedRoute';
import { AgentLayout } from '../layouts/AgentLayout';
import { HotelManagement } from '../pages/agent/HotelManagement';
import { RoomManagement } from '../pages/agent/RoomManagement';
import { BookingList } from '../pages/agent/BookingList';
import { HotelDetail } from '../pages/public/HotelDetail';
import { BookingConfirmation } from '../pages/public/BookingConfirmation';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={routes.home} element={<HotelSearch />} />
          <Route path={routes.login} element={<Login />} />
          <Route path={`${routes.hotels}/:hotelId`} element={<HotelDetail />} />
          <Route path={routes.bookingConfirmation} element={<BookingConfirmation />} />
        </Route>

        <Route
          element={
            <ProtectedRoute roles={['agent']}>
              <AgentLayout />
            </ProtectedRoute>
          }
        >
          <Route path={routes.agentHotel} element={<HotelManagement />} />
          <Route
            path={`${routes.agentHotel}/:hotelId/rooms`}
            element={<RoomManagement />}
          />
          <Route path={routes.agentBooking} element={<BookingList />} />
        </Route>
      </Routes>
    </Router>
  );
};
