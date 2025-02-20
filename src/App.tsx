import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/public/Home';
import { Login } from './pages/public/Login';
import { HotelSearch } from './pages/public/HotelSearch';
import ProtectedRoute from './components/guards/ProtectedRoute';
import { AgentLayout } from './layouts/AgentLayout';
import { Dashboard } from './pages/agent/Dashboard';
import { HotelManagement } from './pages/agent/HotelManagement';
import { RoomManagement } from './pages/agent/RoomManagement';
import { BookingList } from './pages/agent/BookingList';
import { CustomerLayout } from './layouts/CustomerLayout';
import { BookingProcess } from './pages/customer/BookingProcess';
import { MyBookings } from './pages/customer/MyBookings';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/hotels" element={<HotelSearch />} />
          </Route>

          <Route
            element={
              <ProtectedRoute roles={['agent']}>
                <AgentLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/agent/dashboard" element={<Dashboard />} />
            <Route path="/agent/hotels" element={<HotelManagement />} />
            <Route path="/agent/rooms" element={<RoomManagement />} />
            <Route path="/agent/bookings" element={<BookingList />} />
          </Route>

          <Route
            element={
              <ProtectedRoute roles={['customer']}>
                <CustomerLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/booking" element={<BookingProcess />} />
            <Route path="/my-bookings" element={<MyBookings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
