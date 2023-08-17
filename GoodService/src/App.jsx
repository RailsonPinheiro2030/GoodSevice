import React, { useState } from 'react'
import Layout from './layout'
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  Outlet
} from 'react-router-dom';
import { HomeScreen} from './screens';


function App() {


  return (
    <React.Fragment>
        <Routes>    
        <Route path="/" element={<Layout><HomeScreen /></Layout>} />
        </Routes>
    </React.Fragment>
  )
}

export default App
