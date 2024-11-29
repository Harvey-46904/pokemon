// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Store/store'; // Asegúrate de que el store esté importado
import Home from './Pages/Home';
import Details from './Pages/Details';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Provider store={store}> {/* Envuelves tu aplicación con el Provider de Redux */}
      <Router>
        <Navbar />
        
        <Routes>
          <Route path="/home" element={<Home />} />
          {/* Ruta de detalles que ahora acepta dos parámetros `name` y `number` */}
          <Route path="/details/:name/:number" element={<Details />} />
        </Routes>
              
      </Router>
    </Provider>
  );
};

export default App;
