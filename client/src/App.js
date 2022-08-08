import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav';
import TopNav from './components/TopNav';
import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';
import BookDetailsPage from './pages/BookDetailsPage';

function App() {
  return (
      <>
        <BrowserRouter>
          <TopNav />
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/loginuser' element={<Login />} />
              <Route path='/registeruser' element={<Register />} />
              <Route path='/book/:bookId' element={<BookDetailsPage />} />
          </Routes>
          <BottomNav />
        </BrowserRouter>
      </>
  );
}

export default App;
