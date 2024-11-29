import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Store/store';
import Home from './Pages/Home';
import Details from './Pages/Details';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/details/:name/:number" element={<Details />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
