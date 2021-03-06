import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import MyGoogleMapReact from './components/MyGoogleMapReact/MyGoogleMapsReact';
import LocalStorageSample from './components/LocalStorageSample/LocalStorageSample';
import TestPage from './components/TestPage/TestPage';



const App: React.FC = () => {
  return (
    <HashRouter>
      <header className="items-center justify-between flex bg-gray-800 bg-opacity-90 px-12 py-4 my-4 mx-auto shadow-2xl w-11/12">
        <div className="text-2xl text-white font-semibold inline-flex items-center">
            <Link to='/'>React Sample</Link>
        </div>
        <div>
          <ul className="flex text-white">
            <li className="ml-5 px-2 py-1"><Link to='/'>Map</Link></li>
            <li className="ml-5 px-2 py-1"><Link to='/localstrage'>LocalStrage</Link></li>
            <li className="ml-5 px-2 py-1"><Link to='/page1'>Page1</Link></li>
          </ul>
        </div>
      </header>
      <div className="container mx-auto">
        <Routes>
          <Route path='/localstrage' element={<LocalStorageSample />} />
          <Route path='/page1' element={<TestPage message="Page 1" />} />
          <Route path='/' element={<MyGoogleMapReact />} />
          <Route element={<MyGoogleMapReact />} />
        </Routes>

      </div>
    </HashRouter>
  );
}

export default App;
