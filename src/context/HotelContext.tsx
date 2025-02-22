import { createContext, ReactNode, useContext, useState } from 'react';
import { Hotel, HotelContextType, HotelState, Room } from './types/hotel.types';

const HotelContext = createContext<HotelContextType | undefined>(undefined);

const initialState: HotelState = {
  hotels: [],
  loading: false,
  error: null,
};
//
export const HotelProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<HotelState>(initialState);
  const createHotel = async (hotelData: Omit<Hotel, 'id' | 'rooms'>) => {
    try {
      setState({ ...state, loading: true });
      const newHotel: Hotel = {
        ...hotelData,
        id: crypto.randomUUID(),
        rooms: [],
      };
      setState((prevState) => ({
        ...prevState,
        hotels: [...prevState.hotels, newHotel],
        loading: false,
      }));
    } catch (error) {
      setState({ ...state, error: 'Error al crear hotel', loading: false });
    }
  };

  const updateHotel = async (id: string, hotelData: Partial<Hotel>) => {
    try {
      setState((prevState) => ({
        ...prevState,
        hotels: prevState.hotels.map((hotel) =>
          hotel.id === id
            ? {
                ...hotel,
                ...hotelData,
              }
            : hotel
        ),
      }));
    } catch (error) {
      setState({ ...state, error: 'Error al actualizar el hotel', loading: false });
    }
  };

  const toggleHotelStatus = async (hotelId: string) => {
    try {
      setState((prevState) => ({
        ...prevState,
        hotels: prevState.hotels.map((hotel) =>
          hotel.id === hotelId
            ? {
                ...hotel,
                isActive: !hotel.isActive,
              }
            : hotel
        ),
      }));
    } catch (error) {
      setState({
        ...state,
        error: 'Error al cambiar el estado del Hotel',
        loading: false,
      });
    }
  };

  const addRoom = async (hotelId: string, roomData: Omit<Room, 'id'>) => {
    try {
      setState({ ...state, loading: true });

      const newRoom: Room = {
        ...roomData,
        id: crypto.randomUUID(),
      };

      setState((prevState) => ({
        ...prevState,
        hotels: prevState.hotels.map((hotel) =>
          hotel.id === hotelId
            ? {
                ...hotel,
                rooms: [...hotel.rooms, newRoom],
              }
            : hotel
        ),
      }));
    } catch (error) {
      setState({
        ...state,
        error: 'Error al agregar una habitación',
        loading: false,
      });
    }
  };

  const toggleRoomStatus = async (hotelId: string, roomId: string) => {
    try {
      setState((prevState) => ({
        ...prevState,
        hotels: prevState.hotels.map((hotel) =>
          hotel.id === hotelId
            ? {
                ...hotel,
                rooms: hotel.rooms.map((room) =>
                  room.id === roomId
                    ? {
                        ...room,
                        isActive: !room.isActive,
                      }
                    : room
                ),
              }
            : hotel
        ),
      }));
    } catch (error) {
      setState({
        ...state,
        error: 'Error al cambiar el estado de la habitación',
        loading: false,
      });
    }
  };

  const value = {
    ...state,
    createHotel,
    updateHotel,
    toggleHotelStatus,
    addRoom,
    toggleRoomStatus,
  };

  return <HotelContext.Provider value={value}>{children}</HotelContext.Provider>;
};

export const useHotels = () => {
  const context = useContext(HotelContext);
  if (context === undefined) {
    throw new Error('UseHotels must be used within a HotelsProvider  ');
  }
  return context;
};
