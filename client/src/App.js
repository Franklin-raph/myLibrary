import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav';
import Login from './pages/Login';
import Home from './pages/Home'
import Register from './pages/Register';

function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            {/* <div className="wrapper"> */}
              <Route path='/' element={<Home />} />
              <Route path='/loginuser' element={<Login />} />
              <Route path='/registeruser' element={<Register />} />
            {/* </div> */}
          </Routes>
          <BottomNav />
        </BrowserRouter>
      </>
  );
}

export default App;
