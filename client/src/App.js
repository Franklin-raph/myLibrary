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
import { useSelector } from 'react-redux'

function App() {

  const user = useSelector(state => state.user)
  // if(user.value !== null){
  //   console.log("Present")
  // }else{
  //   console.log("Absent")
  // }
  // console.log(user)

  return (
      <>
        <BrowserRouter>
          {user.value ? <TopNav /> : <InitialTopNav />}
          <Routes >
              <Route path='/' element={<Home />} />
              <Route path='/loginuser' element={<Login />} />
              <Route path='/registeruser' element={<Register />} />
              <Route path='/book/:bookId' element={<BookDetailsPage />} />
              <Route path='/userdashboard' element={<UserDashboard />} />
              <Route path='/myProfile' element={<UserProfile />} />
              <Route path='/user/:id' element={<SingleUserProfile />} />
          </Routes>
          <BottomNav />
        </BrowserRouter>
      </>
  );
}

export default App;
