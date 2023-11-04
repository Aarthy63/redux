
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
// import homecomponent from './homecomponent/HomeComponent';
import Register from './components/register/Register'
import Login from './components/login/Login';
import Pagenotfound from './components/pagenotfound/Pagenotfound';
import Dashboard from './components/dashboard/Dashboard';
import Addcontact from './components/addcontact/Addcontact';
import Nav from './components/nav/Nav';
import Listcontact from './components/listcontact/Listcontact'
import { ToastContainer } from 'react-toastify';
import Editcontact from './components/editcontact/Editcontact';
import { Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import ViewUser from './ViewUser';
import Listcomponent from './listcomponent/ListComponent';
import EditUser from './edituser/EditUser';



function App() {
  const PrivatRouter = ({ component }) => {
    const privatelogin = JSON.parse(localStorage.getItem('loggedInUser'))
    if (privatelogin) {
      return component
    } else {
      return <Navigate to='/Login' />
    }
  }
  return (
    <div >
      <ToastContainer></ToastContainer>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ListComponent' element={<Listcomponent />} />
        <Route path='/EditUser/:id' element={<EditUser />}/>
        <Route path='/Register' element={<Register />} />
        <Route path='/Login' element={<Login />} />
        {/* <Route path='/Dashboard' element={<PrivatRouter component={<Dashboard />} />} /> */}
        <Route path='/Addcontact' element={<PrivatRouter component={<Addcontact />} />} />
        <Route path='/Listcontact' element={<PrivatRouter component={<Listcontact />} />} />
        <Route path='Listcontact/Editcontact/:id' element={<Editcontact />} />
        <Route path="*" element={<Pagenotfound />} />
        <Route path= '/ViewUser/:id' element={<ViewUser />} />
        <Route path='/Dashboard/:id' element={<Dashboard/>} />
        {/* <Route path='/Dashboard' element={<Dashboard/>} /> */}
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
