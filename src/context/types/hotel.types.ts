export interface Room {
  id: string;
  type: string;
  basePrice: number;
  taxes: number;
  isActive: boolean;
  location: string;
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  isActive: boolean;
  rooms: Room[];
}

export interface HotelState {
  hotels: Hotel[];
  filteredHotels: Hotel[];
  loading: boolean;
  error: string | null;
}

export interface HotelContextType extends HotelState {
  createHotel: (hotel: Omit<Hotel, 'id' | 'rooms' | 'isActive'>) => Promise<void>;
  updateHotel: (id: string, hotel: Partial<Hotel>) => Promise<void>;
  toggleHotelStatus: (id: string) => Promise<void>;
  addRoom: (hotelId: string, room: Omit<Room, 'id'>) => Promise<void>;
  toggleRoomStatus: (hotelId: string, roomId: string) => Promise<void>;
  searchHotelsByCity: (city: string) => Promise<void>;
}
