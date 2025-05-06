import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Navbar from './component/navlink/Navbar';
import LoginPage from './component/Authform';
import SignupPage from './component/Signuppage';
import Hero from './component/hero/Hero';
import FeaturePage from './component/hero/Featurepage';
import AboutPage from './component/hero/AboutPage';
import VedioChat from './component/vediocall/vediochat';

function App() {
  return (
   
      <div className=" h-auto w-auto justify-center items-center gap-2 flex-col">
      <div>
      <Navbar />
      </div>
        <div className=" mt-5">
        <Routes>
        <Route path='/' element={<Hero/>}/>
        <Route exact path="/login" element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/features' element={<FeaturePage/>}/>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/total-users' element={<VedioChat/>}/>

            </Routes>
           
          
        </div>
      </div>
   
  );
}

export default App;
