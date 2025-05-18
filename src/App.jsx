import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import DropPin from './Pages/DropPin';
import Map from './Pages/Map';
import Swiper from './Pages/testSwiper';
import Search from './Pages/Search';
import TestingLandingPage from './Pages/TestingLandingPage';
import ParkingBox from './Pages/ParkingBox';
import ParkingOnMap from './Pages/ParkingOnmap';
import ParkingOncards from './Pages/ParkingOncards';
import LoginPage from './Admin/Login';
import RegisterPage from './Admin/Register';
import From from './Admin/Form';
import Test from './Admin/Test';  // Keep this import only once
import ContactPage from './Pages/ContactPage';
import Dashboard from './Admin/Dashboard';
import Transport from './Pages/Transport';
import LogisticsMap from './Pages/LogisticsMap';
import LogiCard from './Pages/LogiCard';
import LogiLoc from './Pages/LogiLoc';
import DropLogi from './Pages/DropLogi'
import { useEffect } from 'react';
import Asa from './Pages/AsaWhat'
import Ticket from './Pages/Ticket'
import BoxConfirmCanvas from './Components/BoxConfirmCanvas';
import AdminDrop from "./Pages/AdminDrop";
import Book from "./Pages/Book"
import Register from "./Pages/Register"
import Pay from "./Pages/Pay"
import BookForm from "./Pages/BookingForm"
import Logout from './Pages/Logout';
import Ghar from './Pages/Ghar';
import ContactonCard from "./Pages/ContactonCards"
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maps" element={<Map />} />
        <Route path="/drop-pin" element={<DropPin />} />
        <Route path="/test" element={<Swiper />} />
        <Route path="/admin/imageEditor" element={<TestingLandingPage />} />
        <Route path="/parking-card" element={<ParkingBox />} />
        <Route path="/search" element={<Search />} />
        <Route path="/parkings-maps" element={<ParkingOnMap />} />
        <Route path="/parkings-cards" element={<ParkingOncards />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/register" element={<RegisterPage />} />
        <Route path="/admin/form" element={<From />} />
        <Route path="/admin/test" element={<Test />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/contactoncard" element={<ContactonCard />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path ="/transport" element = {<Transport/>}/>
        <Route path ="/logistics" element = {<LogisticsMap/>}/>
        <Route path ="/logicard" element = {<LogiCard/>}/>
        <Route path ="/logimap" element = {<LogiLoc/>}/>
        <Route path ="/droplogi" element = {<DropLogi/>}/>
        <Route path ="/asa" element = {<Asa/>}/>
        <Route path ="/ticket" element = {<Ticket/>}/>
        <Route path='/test123' element={<BoxConfirmCanvas />} />
        <Route path='/admindrop' element={<AdminDrop />} />
        <Route path="/book" element={<Book/>} />
        <Route path="/register-user" element={<Register />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/book-form" element={<BookForm />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/ghar" element ={<Ghar/>}/>
      </Routes>
    </>
  );
}

export default App;
