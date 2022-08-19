import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav';
import TopNav from './components/TopNav';
import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';
import BookDetailsPage from './pages/BookDetailsPage';
import UserDashboard from './pages/UserDashboard';
import UserProfile from './pages/UserProfile';
import SingleUserProfile from './pages/SingleUserProfile';
import InitialTopNav from './components/InitialTopNav';
import InitialBottomNav from './components/InitialBottomNav';
import { useSelector } from 'react-redux'

function App() {

  const user = useSelector(state => state.user)

  return (
      <>
        <BrowserRouter>
          {user.value ? <TopNav /> : <InitialTopNav />}
          <Routes >
              <Route path='/' element={<Home />} />
              <Route path='/loginuser' element={<Login />} />
              <Route path='/registeruser' element={<Register />} />
              <Route path='/myProfile' element={<UserProfile />} />
              <Route path='/userdashboard' element={<UserDashboard />} />
              <Route path='/book/:bookId' element={<BookDetailsPage />} />
              <Route path='/user/:id' element={<SingleUserProfile />} />
          </Routes>
          {user.value ?  <BottomNav /> : <InitialBottomNav />}
        </BrowserRouter>
      </>
  );
}

export default App;
