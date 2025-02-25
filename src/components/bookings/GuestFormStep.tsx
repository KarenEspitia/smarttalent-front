import { Button, MenuItem, TextField, Typography } from '@mui/material';
import { FieldArrayWithId, FieldErrors, UseFormRegister } from 'react-hook-form';
import { Guest } from '../../context/types/booking.types';
import { BookingFormInputs } from './BookingModal';

interface GuestFormStepProps {
  fields: FieldArrayWithId<BookingFormInputs, 'guests', 'id'>[];
  register: UseFormRegister<BookingFormInputs>;
  errors: FieldErrors<BookingFormInputs>;
  append: (value: Guest) => void;
  remove: (index: number) => void;
}

export const GuestFormStep = ({
  fields,
  register,
  errors,
  append,
  remove,
}: GuestFormStepProps) => {
  return (
    <div>
      <Typography variant="h6" className="mb-2">
        Datos de huéspedes
      </Typography>
      {fields.map((field, index) => (
        <div key={field.id} className="boder p-3 rounded mb-4">
          <div className="mb-4 flex justify-between items-center">
            <Typography variant="subtitle1">Huésped {index + 1}</Typography>
            {index > 0 && (
              <Button color="error" size="small" onClick={() => remove(index)}>
                Eliminar
              </Button>
            )}
          </div>

          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <TextField
                fullWidth
                label="Nombres"
                {...register(`guests.${index}.firstName`, { required: 'Requerido' })}
                error={!!errors.guests?.[index]?.firstName}
                helperText={errors.guests?.[index]?.firstName?.message}
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <TextField
                fullWidth
                label="Fecha de naciomiento"
                type="date"
                InputLabelProps={{ shrink: true }}
                {...register(`guests.${index}.birthDate`, { required: 'Requerido' })}
                error={!!errors.guests?.[index]?.birthDate}
                helperText={errors.guests?.[index]?.birthDate?.message}
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <TextField
                fullWidth
                label="Género"
                select
                {...register(`guests.${index}.gender`, { required: 'Requerido' })}
                error={!!errors.guests?.[index]?.gender}
                helperText={errors.guests?.[index]?.gender?.message}
              >
                <MenuItem value="F">Femenino</MenuItem>
                <MenuItem value="M">Masculino</MenuItem>
                <MenuItem value="O">Otro</MenuItem>
              </TextField>
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <TextField
                fullWidth
                label="Tipo de documento"
                select
                {...register(`guests.${index}.documentType`, { required: 'Requerido' })}
                error={!!errors.guests?.[index]?.documentType}
                helperText={errors.guests?.[index]?.documentType?.message}
              >
                <MenuItem value="CC">CC</MenuItem>
                <MenuItem value="P">Pasaporte</MenuItem>
                <MenuItem value="Other">Otro</MenuItem>
              </TextField>
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <TextField
                fullWidth
                label="Número de documento"
                {...register(`guests.${index}.documentNumber`, { required: 'Requerido' })}
                error={!!errors.guests?.[index]?.documentNumber}
                helperText={errors.guests?.[index]?.documentNumber?.message}
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <TextField
                fullWidth
                label="Email"
                {...register(`guests.${index}.email`, {
                  required: 'Requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido',
                  },
                })}
                error={!!errors.guests?.[index]?.email}
                helperText={errors.guests?.[index]?.email?.message}
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <TextField
                fullWidth
                label="Teléfono"
                {...register(`guests.${index}.phone`, { required: 'Requerido' })}
                error={!!errors.guests?.[index]?.phone}
                helperText={errors.guests?.[index]?.phone?.message}
              />
            </div>
          </div>
        </div>
      ))}

      <Button
        variant="outlined"
        onClick={() =>
          append({
            firstName: '',
            lastName: '',
            birthDate: '',
            gender: '',
            documentType: '',
            documentNumber: '',
            email: '',
            phone: '',
          })
        }
      >
        Agregar huésped
      </Button>
    </div>
  );
};
