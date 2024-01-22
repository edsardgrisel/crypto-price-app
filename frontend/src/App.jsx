import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddCrypto from './pages/AddCrypto';
import EditCrypto from './pages/EditCrypto';
import DeleteCrypto from './pages/DeleteCrypto';
import Home from './pages/Home';
import ShowCrypto from './pages/ShowCrypto';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cryptos/add' element={<AddCrypto />} />
        <Route path='/cryptos/details/:id' element={<ShowCrypto />} />
        <Route path='/cryptos/edit/:id' element={<EditCrypto />} />
        <Route path='/cryptos/delete/:id' element={<DeleteCrypto />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App