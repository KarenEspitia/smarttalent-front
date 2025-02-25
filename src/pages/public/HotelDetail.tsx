import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from '../../routes/index';
import { Room } from '../../context/types/hotel.types';
import { useHotels } from '../../context/HotelContext';
import { useState } from 'react';
import { BookingModal } from '../../components/bookings/BookingModal';

export const HotelDetail = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const { hotelId } = useParams<{
    hotelId: string;
  }>();
  const { hotels } = useHotels();
  const navigate = useNavigate();

  const hotel = hotels.find((h) => h.id === hotelId);

  if (!hotel) {
    return <Typography>Hotel no encontrado</Typography>;
  }

  const handleBookRoom = (room: Room) => {
    setSelectedRoom(room);
    setIsBookingModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRoom(null);
    setIsBookingModalOpen(false);
  };

  const handleBookingSuccess = () => {
    handleCloseModal();
    navigate(routes.bookingConfirmation);
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <Button
          variant="outlined"
          onClick={() => navigate(`${routes.hotels}`)}
          className="mr-4"
        >
          Volver
        </Button>
        <Typography variant="h4">{hotel.name}</Typography>
      </div>

      <Typography variant="h6">{hotel.city}</Typography>
      <Divider className="my-4" />
      <Typography variant="h5" className="mb-4">
        Habitaciones disponibles
      </Typography>

      <div className="flex flex-wrap mx-3">
        {hotel.rooms
          .filter((room) => room.isActive)
          .map((room) => (
            <div className="w-full sm:w-1/2 md:w-1/3 px-3 mb-6" key={room.id}>
              <Card className="h-full flex flex-col">
                <CardContent className="flex-grow">
                  <Typography variant="h6">{room.type}</Typography>
                  <Divider className="my-2" />
                  <Typography>
                    <strong>Costo base:</strong>${room.basePrice.toFixed(2)}
                  </Typography>
                  <Typography>
                    <strong>Impuestos:</strong>${room.taxes.toFixed(2)}
                  </Typography>
                  <Typography>
                    <strong>Total:</strong>${room.basePrice + room.taxes.toFixed(2)}
                  </Typography>
                  <Typography className="mt-2">
                    <strong>Ubicación:</strong>${room.location}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleBookRoom(room)}
                  >
                    Reservar
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))}
        {hotel.rooms.filter((room) => room.isActive).length === 0 && (
          <Typography className="p-4">
            No hay habitaciones disponibles en este hotel
          </Typography>
        )}
      </div>
      {isBookingModalOpen && selectedRoom && (
        <BookingModal
          open={isBookingModalOpen}
          onClose={handleCloseModal}
          hotel={hotel}
          room={selectedRoom}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
};
