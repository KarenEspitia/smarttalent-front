import { Typography } from '@mui/material';
import { Hotel, Room } from '../../context/types/hotel.types';
interface ConfirmationStepProps {
  hotel: Hotel;
  room: Room;
}

export const ConfirmationStep = ({ hotel, room }: ConfirmationStepProps) => {
  return (
    <div>
      <Typography variant="h6" className="mb-2">
        Confirmar reserva
      </Typography>
      <div className="border p-4 rounded">
        <Typography>
          Estas a punto de confirmar tu reserva para el hotel {hotel.name} en {hotel.city}
        </Typography>
        <Typography>Habitación: {room.type}</Typography>
        <Typography>Precio total: ${(room.basePrice + room.taxes).toFixed(2)}</Typography>
      </div>
    </div>
  );
};
