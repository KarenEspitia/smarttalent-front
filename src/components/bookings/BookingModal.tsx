import { useForm } from 'react-hook-form';
import { Hotel, Room } from '../../context/types/hotel.types';
import { useBooking } from '../../context/BookingContext';
import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import { GuestFormStep } from './GuestFormStep';
import { EmergencyContactStep } from './EmergencyContactStep';
import { ConfirmationStep } from './ConfirmationStep';

interface BookingFormInputs {
  guests: {
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: string;
    documentType: string;
    documentNumber: string;
    email: string;
    phone: string;
  }[];
  checkIn: string;
  checkOut: string;
  totalGuests: number;
  emergencyContact: {
    fullName: string;
    phone: string;
  };
}

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  hotel: Hotel;
  room: Room;
  onSuccess: () => void;
}

export const BookingModal = ({
  open,
  onClose,
  hotel,
  room,
  onSuccess,
}: BookingModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormInputs>({
    defaultValues: {
      guests: [
        {
          firstName: '',
          lastName: '',
          birthDate: '',
          gender: '',
          documentType: '',
          documentNumber: '',
          email: '',
          phone: '',
        },
      ],
      checkIn: '',
      checkOut: '',
      totalGuests: 1,
      emergencyContact: {
        fullName: '',
        phone: '',
      },
    },
  });

  const { createBooking } = useBooking();

  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Datos de huespedes', 'Contacto de emergencia', 'Confirmación'];

  const nextStep = () => setActiveStep((prev) => prev + 1);
  const prevStep = () => setActiveStep((prev) => prev - 1);

  const onSubmit = async (data: BookingFormInputs) => {
    if (activeStep < 2) {
      nextStep();
      return;
    }
    try {
      await createBooking({
        hotelId: hotel.id,
        roomId: room.id,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        totalGuests: data.totalGuests,
        guests: data.guests,
        emergencyContact: data.emergencyContact,
      });
      onSuccess();
    } catch (error) {
      console.error('Error al crear reserva: ', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Reservar habitaciones</DialogTitle>
      <DialogContent>
        <div>
          <div className="mb-4">
            <Typography variant="h6">{hotel.name}</Typography>
            <Typography>Ciudad: {hotel.city}</Typography>
            <Typography>Habitación: {room.type}</Typography>
            <Typography>
              Precio Total: ${(room.basePrice + room.taxes).toFixed(2)}
            </Typography>
          </div>

          <Stepper activeStep={activeStep} className="mb-4">
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={handleSubmit(onSubmit)}>
            {activeStep === 0 && (
              <div>
                <Typography variant="h6" className="mb-2">
                  Detalles de la reserva
                </Typography>
                <div className="flex flex-wrap -mx-2">
                  <div className="w-full md:w-1/3 px-2 mb-4">
                    <TextField
                      fullWidth
                      type="date"
                      label="Fecha de entrada"
                      InputLabelProps={{ shrink: true }}
                      {...register('checkIn', { required: true })}
                      error={!!errors.checkIn}
                      helperText={errors.checkIn?.message}
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-2 mb-4">
                    <TextField
                      fullWidth
                      type="date"
                      label="Fecha de salida"
                      InputLabelProps={{ shrink: true }}
                      {...register('checkOut', { required: true })}
                      error={!!errors.checkOut}
                      helperText={errors.checkOut?.message}
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-2 mb-4">
                    <TextField
                      fullWidth
                      type="number"
                      label="Cantidad de huespedes"
                      InputLabelProps={{ shrink: true }}
                      {...register('totalGuests', { required: true })}
                      error={!!errors.totalGuests}
                      helperText={errors.totalGuests?.message}
                    />
                  </div>
                </div>
              </div>
            )}
            {activeStep === 1 && <GuestFormStep />}
            {activeStep === 2 && <EmergencyContactStep />}
            {activeStep === 3 && <ConfirmationStep />}
            <DialogActions className="mt-4 px-0">
              {activeStep < 0 && <Button onClick={prevStep}>Atrás</Button>}
              <Button onClick={onClose}>Cancelar</Button>
              <Button type="submit">
                {activeStep < 3 ? 'Continuar' : 'Confirmar reserva'}
              </Button>
            </DialogActions>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
