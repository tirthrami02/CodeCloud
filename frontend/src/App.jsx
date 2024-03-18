import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import DeleteCodes from './pages/DeleteCodes';
import EditCodes from './pages/EditCodes';
import ShowCode from './pages/ShowCode';
import CreateCodes from './pages/CreateCodes';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/codes/create' element={<CreateCodes />} />
      <Route path='/codes/details/:id' element={<ShowCode />} />
      <Route path='/codes/edit/:id' element={<EditCodes />} />
      <Route path='/codes/delete/:id' element={ <DeleteCodes />} />
    </Routes>
  )
}

export default App