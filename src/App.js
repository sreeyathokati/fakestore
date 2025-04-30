import React from 'react';
import './App.css'; import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Fakestore } from './components/fakestore';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Fakestore />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
