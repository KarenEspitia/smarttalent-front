import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Booking, BookingContextType, BookingState } from './types/booking.types';

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const getInitialBookings = (): Booking[] => {
  const savedBookings = sessionStorage.getItem('bookings');
  return savedBookings ? JSON.parse(savedBookings) : [];
};

export const BookinkProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<BookingState>({
    bookings: getInitialBookings(),
    loading: false,
    error: null,
  });

  useEffect(() => {
    sessionStorage.setItem('bookings', JSON.stringify(state.bookings));
  }, [state.bookings]);

  const createBooking = async (booking: Omit<Booking, 'id'>) => {
    try {
      setState({ ...state, loading: true });
      const newBooking: Booking = {
        ...booking,
        id: crypto.randomUUID(),
      };
      setState((prevState) => ({
        ...prevState,
        bookings: [...prevState.bookings, newBooking],
        loading: false,
      }));
    } catch (error) {
      setState({ ...state, error: 'Error al crear la reserva', loading: false });
    }
  };

  const getHotelBookings = (hotelId: string) => {
    return state.bookings.filter((booking) => booking.hotelId === hotelId);
  };

  const value = {
    ...state,
    createBooking,
    getHotelBookings,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('UseBooking must be used within a BookingsProvider  ');
  }
  return context;
};
