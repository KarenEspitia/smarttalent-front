import { Hotel } from '../types/hotel.types';

export const sampleHotels: Hotel[] = [
  {
    id: crypto.randomUUID(),
    name: 'Gran Hotel Central',
    city: 'Bogotá',
    isActive: true,
    rooms: [
      {
        id: '101',
        type: 'Habitación Doble',
        basePrice: 120000,
        taxes: 18000,
        location: '2° Piso',
        isActive: true,
      },
      {
        id: '102',
        type: 'Suite',
        basePrice: 250000,
        taxes: 30000,
        location: '3° Piso',
        isActive: true,
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: 'Hotel Plaza',
    city: 'Medellin',
    isActive: true,
    rooms: [
      {
        id: '201',
        type: 'Habitación Individual',
        basePrice: 90000,
        taxes: 15000,
        location: '1° Piso',
        isActive: true,
      },
    ],
  },
];
