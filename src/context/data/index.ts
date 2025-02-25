import { Hotel } from '../types/hotel.types';

export const sampleHotels: Hotel[] = [
  {
    id: crypto.randomUUID(),
    name: 'Gran Hotel Central',
    city: 'Barcelona',
    isActive: true,
    rooms: [
      {
        id: '101',
        type: 'Habitación Doble',
        basePrice: 120,
        taxes: 15,
        location: '2° Piso',
        isActive: true,
      },
      {
        id: '102',
        type: 'Suite',
        basePrice: 250,
        taxes: 30,
        location: '3° Piso',
        isActive: true,
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: 'Hotel Plaza',
    city: 'Madrid',
    isActive: true,
    rooms: [
      {
        id: '201',
        type: 'Habitación Individual',
        basePrice: 90,
        taxes: 10,
        location: '1° Piso',
        isActive: true,
      },
    ],
  },
];
