import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav';
import TopNav from './components/TopNav';
import Login from './pages/Login';
import Home from './pages/Home'
import Register from './pages/Register';

function App() {
  return (
      <>
        <BrowserRouter>
          <TopNav />
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/loginuser' element={<Login />} />
              <Route path='/registeruser' element={<Register />} />
          </Routes>
          <BottomNav />
        </BrowserRouter>
      </>
  );
}

export default App;
