import './App.css';
import { Route,Routes } from 'react-router';
import SignUp from './Components/Auth/SignUp';
import Login from './Components/Auth/Login';
import Home from './Components/Pages/Home';
import Reset from './Components/Auth/Reset';
import ComposeMail from './Components/Pages/ComposeMail';

function App() {

  return (
<>
 <Routes>
  <Route path='/composemail' element={<ComposeMail></ComposeMail>}></Route>
  <Route  index element={<Login></Login>}></Route>
  <Route  path='/login' element={<Login></Login>}></Route>
  <Route  path='/home' element={<Home></Home>}></Route>
 <Route  path="/signup" element={<SignUp></SignUp>}></Route>
 <Route path="/forget" element={<Reset></Reset>}></Route>
</Routes> 
</>  );

}

export default App;
