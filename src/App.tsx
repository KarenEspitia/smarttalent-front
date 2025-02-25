import { AuthProvider } from './context/AuthContext';
import { BookinkProvider } from './context/BookingContext';
import { HotelProvider } from './context/HotelContext';
import { AppRouter } from './routes/AppRouter';

const App = () => {
  return (
    <AuthProvider>
      <HotelProvider>
        <BookinkProvider>
          <AppRouter />
        </BookinkProvider>
      </HotelProvider>
    </AuthProvider>
  );
};

export default App;
