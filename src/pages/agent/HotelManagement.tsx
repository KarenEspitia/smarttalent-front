import { useState } from 'react';
import { HotelForm } from '../../components/hotels/HotelForm';
import { Hotel } from '../../context/types/hotel.types';
import { useHotels } from '../../context/HotelContext';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../routes';

export const HotelManagement = () => {
  const { hotels, toggleHotelStatus } = useHotels();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | undefined>(undefined);
  const navigate = useNavigate();

  const handleRooms = (hotel: Hotel) => {
    navigate(`${routes.agentHotel}/${hotel.id}/rooms`);
  };

  const handleEdit = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setSelectedHotel(undefined);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Gestión de Hoteles</h1>
        <Button variant="contained" onClick={() => setIsFormOpen(true)}>
          Nuevo Hotel
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Ciudad</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {hotels.map((hotel) => (
              <TableRow key={hotel.id}>
                <TableCell>{hotel.name}</TableCell>
                <TableCell>{hotel.city}</TableCell>
                <TableCell>
                  <Switch
                    checked={hotel.isActive}
                    onChange={() => toggleHotelStatus(hotel.id)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    className="mr-2"
                    onClick={() => handleEdit(hotel)}
                  >
                    Editar
                  </Button>
                  <Button variant="outlined" onClick={() => handleRooms(hotel)}>
                    Habitaciones
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isFormOpen && <HotelForm hotel={selectedHotel} onClose={handleClose} />}
    </div>
  );
};
