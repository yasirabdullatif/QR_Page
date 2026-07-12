import React from 'react'
import  Get_Issue  from './component/Get_Issue'
import { Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import ShowData from './component/ShowData'
// import QrCode from './component/Qr-Code'
import AdminDashboard from "./component/AdminDashboard";

const App = () => {
  return (
    <>
      {/* <Routes>
        <Route path='/' element={<Get_Issue />} />
        <Route path='/qrcode/:id' element={<QrCode />} />
        <Route path='/showdata/:id' element={<ShowData />} />

      </Routes> */}
<Routes>

    <Route path="/" element={<Get_Issue />} />

    <Route path="/dashboard" element={<AdminDashboard />} />

    <Route path="/showdata/:id" element={<ShowData />} />

</Routes>
    </>
  )
}

export default App