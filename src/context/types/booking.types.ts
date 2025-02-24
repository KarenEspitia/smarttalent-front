export interface Guest {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  documentType: string;
  documentNumber: string;
  email: string;
  phone: string;
}

export interface EmergencyContact {
  fullName: string;
  phone: string;
}

export interface Booking {
  id: string;
  hotelId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: Guest[];
  emergencyContact: EmergencyContact[];
  totalGuests: number;
}

export interface BookingState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}
export interface BookingContextType extends BookingState {
  createBooking: (booking: Omit<Booking, 'id'>) => Promise<void>;
  getHotelBookings: (hotelId: string) => Booking[];
}
