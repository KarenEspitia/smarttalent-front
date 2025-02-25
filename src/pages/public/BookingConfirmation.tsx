import { Paper, Typography } from '@mui/material';
import { useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { twMerge } from 'tailwind-merge';

export const BookingConfirmation = () => {
  useEffect(() => {
    console.log('Simulando envío de email de confirmación...');
  }, []);

  return (
    <div>
      <Paper>
        <div>
          <CheckCircleIcon color="success" className={twMerge('text-6xl')} />
        </div>
        <Typography variant="h5" className={twMerge('text-center mb-4')}>
          ¡Reserva Confirmada!
        </Typography>

        <Typography className={twMerge('mb-6 text-center')}>
          Tu reserva ha sido realizada con éxito. Hemos enviado un correo electrónico con
          los detalles de tu reserva.
        </Typography>
      </Paper>
    </div>
  );
};
