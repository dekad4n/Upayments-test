import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar';
import MainRouter from './config/router';

function App() {
  return (
    <div className="App lg:px-10 lg:mx-10 md:px-5 md:mx-5 sm:mx-5 sm:px-5 px-3 mx-3">
      <BrowserRouter>
        <Navbar />
        <MainRouter />

      </BrowserRouter>
    </div>
  );
}

export default App;
