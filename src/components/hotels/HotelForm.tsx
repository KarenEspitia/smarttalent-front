import { Hotel } from '../../context/types/hotel.types';
import { useHotels } from '../../context/HotelContext';
import { useForm } from 'react-hook-form';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

interface HotelFormInputs {
  name: string;
  city: string;
}

interface HotelFormProps {
  hotel?: Hotel;
  onClose: () => void;
}

export const HotelForm = ({ hotel, onClose }: HotelFormProps) => {
  const { createHotel, updateHotel } = useHotels();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HotelFormInputs>({
    defaultValues: hotel,
  });

  const onSubmit = async (data: HotelFormInputs) => {
    try {
      if (hotel) {
        await updateHotel(hotel.id, data);
      } else {
        createHotel(data);
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{hotel ? 'Editar hotel' : 'Nuevo hotel'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            fullWidth
            label="Nombre"
            {...register('name', { required: 'El nombre es requerido' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            fullWidth
            label="Ciudad"
            {...register('city', { required: 'La ciudad es requerida' })}
            error={!!errors.city}
            helperText={errors.city?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            {hotel ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
