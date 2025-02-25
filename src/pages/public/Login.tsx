import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../routes/index';

interface LoginFormInputs {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const user = await login(data);
      const isAgentUser = user?.role === 'agent';

      if (isAgentUser) {
        navigate(routes.agentHotel);
      } else {
        navigate(routes.home);
      }
    } catch (error) {
      console.error('Error en login: ', error);
    }
  };

  return (
    <Box>
      <Paper>
        <Typography variant="h5">Iniciar Sesión</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Email"
            {...register('email', {
              required: 'El email es obligatorio',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            type="password"
            fullWidth
            label="Contraseña"
            {...register('password', {
              required: 'La contraseña es obligatoria',
              minLength: {
                value: 6,
                message: 'La contraseña debe tener mínimo 6 caracteres',
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button type="submit" variant="contained" fullWidth>
            Iniciar Sesión
          </Button>
        </form>
      </Paper>
    </Box>
  );
};
