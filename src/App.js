import './App.css';
import { Route,Routes } from 'react-router';
import SignUp from './Components/Auth/SignUp';
import Login from './Components/Auth/Login';
import Home from './Components/Pages/Home';


function App() {

  return (
<>
<Routes>
  <Route  index element={<Login></Login>}></Route>
  <Route  path='/login' element={<Login></Login>}></Route>
  <Route  path='/home' element={<Home></Home>}></Route>
 <Route  path="/signup" element={<SignUp></SignUp>}></Route>
</Routes>
</>  );

}

export default App;
