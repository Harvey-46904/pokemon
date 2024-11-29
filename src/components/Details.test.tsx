import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Details from '../Pages/Details';
import { useParams } from 'react-router-dom';

// Simulamos la función `useParams` para devolver valores ficticios
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('Details', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ name: 'bulbasaur', number: '1' }); // Finge que tenemos un Pokémon llamado "bulbasaur"
  });

  test('muestra el skeleton loader mientras se está cargando', () => {
    render(
      <Router>
        <Details />
      </Router>
    );

    // Verificar que se muestra el skeleton loader
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  test('muestra los detalles del Pokémon después de la carga', async () => {
    // Simulamos la respuesta de la API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          name: 'bulbasaur',
          weight: 69,
          sprites: { front_default: 'https://some-url.com/bulbasaur.png' },
          types: [{ type: { name: 'grass' } }],
          stats: [{ stat: { name: 'hp' }, base_stat: 45 }]
        }),
      })
    ) as jest.Mock;

    render(
      <Router>
        <Details />
      </Router>
    );

    // Esperamos a que los datos se carguen
    await waitFor(() => screen.getByText('bulbasaur'));

    // Verificar que los detalles del Pokémon estén presentes
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Peso')).toBeInTheDocument();
    expect(screen.getByText('69 kg')).toBeInTheDocument();
    expect(screen.getByText('hp')).toBeInTheDocument();
  });
});
