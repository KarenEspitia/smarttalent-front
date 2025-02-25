import { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { useHotels } from '../../context/HotelContext';
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { twMerge } from 'tailwind-merge';
import { Booking } from '../../context/types/booking.types';

export const BookingList = () => {
  const { bookings } = useBooking();
  const { hotels } = useHotels();

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const getHotelName = (hotelId: string) => {
    const hotel = hotels.find((h) => h.id === hotelId);
    return hotel?.name || 'Hotel no encontrado';
  };

  const getRoomType = (hotelId: string, roomId: string) => {
    const hotel = hotels.find((h) => h.id === hotelId);
    const room = hotel?.rooms.find((r) => r.id === roomId);
    return room?.type || 'Habitación no encontrada';
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Fecha no disponible';

    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  const handleCloseDetails = () => {
    setSelectedBooking(null);
  };

  return (
    <div className="p-4">
      <Typography variant="h4" className={twMerge('mb-6')}>
        Listado de Reservas
      </Typography>
      {bookings.length === 0 ? (
        <Paper className={twMerge('p-6 text-center')}>
          <Typography className={twMerge('text-gray-600')}>
            No hay reservas registradas en el sistema.
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper} className={twMerge('mb-8')}>
          <Table>
            <TableHead className={twMerge('bg-gray-100')}>
              <TableRow>
                <TableCell className={twMerge('font-bold')}>Hotel</TableCell>
                <TableCell className={twMerge('font-bold')}>Habitación</TableCell>
                <TableCell className={twMerge('font-bold')}>Check-in</TableCell>
                <TableCell className={twMerge('font-bold')}>Check-out</TableCell>
                <TableCell className={twMerge('font-bold')}>Huéspedes</TableCell>
                <TableCell className={twMerge('font-bold')}>Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{getHotelName(booking.hotelId)}</TableCell>
                  <TableCell>{getRoomType(booking.hotelId, booking.roomId)}</TableCell>
                  <TableCell>{formatDate(booking.checkIn)}</TableCell>
                  <TableCell>{formatDate(booking.checkOut)}</TableCell>
                  <TableCell>
                    <Chip
                      label={`${booking.guests.length} huéspedes`}
                      className={twMerge('text-sm')}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      className={twMerge('text-sm')}
                      onClick={() => handleViewDetails(booking)}
                    >
                      Ver Detalles
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog
        open={!!selectedBooking}
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle className={twMerge('bg-gray-50 border-b')}>
          Detalles de la Reserva
        </DialogTitle>
        <DialogContent className={twMerge('py-4')}>
          {selectedBooking && (
            <div>
              <div className="mb-6 border-b pb-4">
                <Typography variant="h6" className={twMerge('mb-2 font-bold')}>
                  {' '}
                  Información del Hotel
                </Typography>
                <Typography className={twMerge('mb-1')}>
                  <span className={twMerge('font-medium')}>Hotel:</span>{' '}
                  {getHotelName(selectedBooking.hotelId)}
                </Typography>
                <Typography className={twMerge('mb-1')}>
                  <span className={twMerge('font-medium')}>Habitación:</span>{' '}
                  {getRoomType(selectedBooking.hotelId, selectedBooking.roomId)}
                </Typography>
                <Typography className={twMerge('mb-1')}>
                  <span className={twMerge('font-medium')}>Check-in:</span>{' '}
                  {formatDate(selectedBooking.checkIn)}
                </Typography>
                <Typography className={twMerge('mb-1')}>
                  <span className={twMerge('font-medium')}>Check-out:</span>{' '}
                  {formatDate(selectedBooking.checkOut)}
                </Typography>
              </div>
              <div className="mb-6 border-b pb-4">
                <Typography variant="h6" className={twMerge('mb-2 font-bold')}>
                  Huéspedes
                </Typography>
                {selectedBooking.guests.map((guest, index) => (
                  <Paper key={index} className={twMerge('p-3 mb-2 bg-gray-50')}>
                    <Typography className={twMerge('mb-1')}>
                      <span className={twMerge('font-medium')}>Nombre:</span>{' '}
                      {guest.firstName} {guest.lastName}
                    </Typography>
                    <Typography className={twMerge('mb-1')}>
                      <span className={twMerge('font-medium')}>Email:</span> {guest.email}
                    </Typography>
                    <Typography className={twMerge('mb-1')}>
                      <span className={twMerge('font-medium')}>Teléfono:</span>{' '}
                      {guest.phone}
                    </Typography>
                    <Typography className={twMerge('mb-1')}>
                      <span className={twMerge('font-medium')}>Documento:</span>{' '}
                      {guest.documentType} - {guest.documentNumber}
                    </Typography>
                  </Paper>
                ))}
              </div>

              <div>
                <Typography variant="h6" className={twMerge('mb-2 font-bold')}>
                  Contacto de Emergencia
                </Typography>
                <Paper className={twMerge('p-3 bg-gray-50')}>
                  <Typography className={twMerge('mb-1')}>
                    <span className={twMerge('font-medium')}>Nombre:</span>{' '}
                    {selectedBooking.emergencyContact.fullName}
                  </Typography>
                  <Typography className={twMerge('mb-1')}>
                    <span className={twMerge('font-medium')}>Teléfono:</span>{' '}
                    {selectedBooking.emergencyContact.phone}
                  </Typography>
                </Paper>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions className={twMerge('border-t')}>
          <Button onClick={handleCloseDetails}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
