import { TextField, Typography } from '@mui/material';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { BookingFormInputs } from './BookingModal';

interface EmergencyContactStepProps {
  register: UseFormRegister<BookingFormInputs>;
  errors: FieldErrors<BookingFormInputs>;
}

export const EmergencyContactStep = ({ register, errors }: EmergencyContactStepProps) => {
  return (
    <div>
      <Typography variant="h6" className="mb-2">
        Contacto de emergencia
      </Typography>
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/2 px-2 mb-4">
          <TextField
            fullWidth
            label="Nombre completo"
            {...register('emergencyContact.fullName', { required: true })}
            error={!!errors.emergencyContact?.fullName}
            helperText={errors.emergencyContact?.fullName?.message}
          />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <TextField
            fullWidth
            label="Teléfono"
            {...register('emergencyContact.phone', { required: true })}
            error={!!errors.emergencyContact?.phone}
            helperText={errors.emergencyContact?.phone?.message}
          />
        </div>
      </div>
    </div>
  );
};
