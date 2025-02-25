import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useHotels } from '../../context/HotelContext';

interface RoomFormInputs {
  type: string;
  basePrice: number;
  taxes: number;
  location: string;
}

interface RoomFormProps {
  hotelId: string;
  onClose: () => void;
}

export const RoomForm = ({ hotelId, onClose }: RoomFormProps) => {
  const { addRoom } = useHotels();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomFormInputs>();

  const onSubmit = async (data: RoomFormInputs) => {
    try {
      await addRoom(hotelId, { ...data, isActive: true });
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Nueva habitación</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            fullWidth
            label="Tipo de Habitación"
            margin="normal"
            {...register('type', { required: 'El tipo es requerido' })}
            error={!!errors.type}
            helperText={errors.type?.message}
          />

          <TextField
            fullWidth
            type="number"
            label="Costo Base"
            margin="normal"
            {...register('basePrice', {
              required: 'El costo base requerido',
              min: { value: 0, message: 'El costo debe ser positivo' },
            })}
            error={!!errors.basePrice}
            helperText={errors.basePrice?.message}
          />

          <TextField
            fullWidth
            type="number"
            label="Impuestos"
            margin="normal"
            {...register('taxes', {
              required: 'Los impuestos son requeridos',
              min: { value: 0, message: 'Los impuestos deben ser positivos' },
            })}
            error={!!errors.taxes}
            helperText={errors.taxes?.message}
          />

          <TextField
            fullWidth
            label="Ubicación"
            margin="normal"
            {...register('location', { required: 'La ubicación es requerida' })}
            error={!!errors.location}
            helperText={errors.location?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            Crear
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
