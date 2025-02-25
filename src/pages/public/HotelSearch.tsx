import {
  Button,
  Card,
  CardActions,
  CardContent,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHotels } from '../../context/HotelContext';
import { twMerge } from 'tailwind-merge';

interface SearchFormInputs {
  city: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export const HotelSearch = () => {
  const [searched, setSearched] = useState(false);
  const { loading, searchHotelsByCity, filteredHotels } = useHotels();
  const { register, handleSubmit } = useForm<SearchFormInputs>();

  const onSubmit = async (data: SearchFormInputs) => {
    await searchHotelsByCity(data.city);
    setSearched(true);
  };

  return (
    <div className="p-4">
      <Paper className="p-4 mb-4">
        <Typography variant="h5">Buscar Hoteles</Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="w-full md:w-1/4 mb-4 md:mb-0">
              <TextField
                fullWidth
                label="Ciudad"
                {...register('city', { required: true })}
              />
            </div>
            <div>
              <TextField
                fullWidth
                type="date"
                label="Fecha de entrada"
                InputLabelProps={{ shrink: true }}
                {...register('checkIn')}
              />
            </div>
            <div>
              <TextField
                fullWidth
                type="date"
                label="Fecha de salida"
                InputLabelProps={{ shrink: true }}
                {...register('checkOut')}
              />
            </div>
            <div>
              <TextField
                fullWidth
                label="Personas"
                type="number"
                {...register('guests')}
              />
            </div>
            <div className="h-full">
              <Button type="submit" variant="contained" fullWidth>
                Buscar
              </Button>
            </div>
          </div>
        </form>
      </Paper>

      {loading && <Typography>Cargando...</Typography>}
      {searched && !loading && filteredHotels.length === 0 && (
        <Typography>No se encontraron hoteles en esa ciudad</Typography>
      )}

      <div className="flex flex-wrap -mx-3">
        {filteredHotels.map((hotel) => (
          <div key={hotel.id} className="w-full sm:w-1/2 px-3 mb-6">
            <Card className={twMerge('h-full flex flex-col')}>
              <CardContent className={twMerge('flex-grow')}>
                <Typography variant="h6">{hotel.name}</Typography>
                <Typography color="textSecondary">{hotel.city}</Typography>
                <Typography className="mt-2">
                  {hotel.rooms.length} Habitaciones disponibles
                </Typography>
              </CardContent>

              <CardActions>
                <Button variant="contained" fullWidth href={`/hotels/${hotel.id}`}>
                  Ver habitaciones
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
