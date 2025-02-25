import {
  Button,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { routes } from '../../routes/index';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { RoomForm } from '../../components/rooms/RoomForm';
import { useHotels } from '../../context/HotelContext';

export const RoomManagement = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const navigate = useNavigate();
  const { hotels, toggleRoomStatus } = useHotels();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const hotel = hotels.find((h) => h.id === hotelId);

  if (!hotel) {
    return <Typography>Hotel no encontrado</Typography>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <div>
          <Typography variant="h5" className="font-bold">
            Habitaciones de {hotel.name}
          </Typography>
          <Typography variant="subtitle1" className="text-gray-600">
            {hotel.city}
          </Typography>
        </div>

        <div>
          <Button
            variant="outlined"
            onClick={() => navigate(routes.agentHotel)}
            className="mr-2"
          >
            Volver
          </Button>
          <Button variant="contained" onClick={() => setIsFormOpen(true)}>
            Agregar habitación
          </Button>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tipo</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Impuestos</TableCell>
              <TableCell>Ubicación</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {hotel.rooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell>{room.type}</TableCell>
                <TableCell>${room.basePrice}</TableCell>
                <TableCell>${room.taxes}</TableCell>
                <TableCell>{room.location}</TableCell>
                <TableCell>
                  <Switch
                    checked={room.isActive}
                    onChange={() => toggleRoomStatus(hotel.id, room.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
            {hotel.rooms.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No hay habitaciones registradas
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {isFormOpen && <RoomForm hotelId={hotel.id} onClose={() => setIsFormOpen(false)} />}
    </div>
  );
};
