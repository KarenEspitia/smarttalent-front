import { createContext, ReactNode, useContext, useState } from 'react';
import { Booking, BookingContextType, BookingState } from './types/booking.types';

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const initialState: BookingState = {
  bookings: [],
  loading: false,
  error: null,
};

export const BookinkProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<BookingState>(initialState);

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
