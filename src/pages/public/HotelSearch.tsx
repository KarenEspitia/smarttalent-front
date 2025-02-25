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
        <Typography variant="h5" className="mb-4">
          Buscar Hoteles
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
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
                helperText="Fecha de entrada"
                {...register('checkIn')}
              />
            </div>
            <div>
              <TextField
                fullWidth
                type="date"
                helperText="Fecha de salida"
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
            <div>
              <Button type="submit" variant="contained" fullWidth className="h-full">
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
          <div key={hotel.id} className="w-full sm:w-1/2 md:w-1/3 px-3 mb-6">
            <Card className="h-full flex flex-col">
              <CardContent className="flex-grow">
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
