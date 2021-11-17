import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom'
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
            <li className="ml-5 px-2 py-1"><Link to='/'>Home</Link></li>
            <li className="ml-5 px-2 py-1"><Link to='/page1'>Page1</Link></li>
            <li className="ml-5 px-2 py-1"><Link to='/page2'>Page2</Link></li>
          </ul>
        </div>
      </header>
      <div className="container mx-auto">
        <Routes>
          <Route path='/page1' element={<TestPage message="Page 1" />} />
          <Route path='/page2' element={<TestPage message="Page 2" />} />
          <Route path='/' element={<TestPage message='Deploy test' />} />
          <Route element={<TestPage message="Deploy test" />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
