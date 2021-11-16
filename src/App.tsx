import React, { FC } from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter, Routes, Route, Link } from 'react-router-dom'

const Page1: FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Page1</p>
      </header>
    </div>
  )
}

const Page2: FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Page2</p>
      </header>
    </div>
  )
}

const Home: FC = () => {
  return(
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Deploy test</p>
      </header>
    </div>
  )
}

function App() {
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

      <Routes>
        <Route path='/page1' element={<Page1 />} />
        <Route path='/page2' element={<Page2 />} />
        <Route path='/' element={<Home />} />
        <Route element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
