import './App.css';
import { Route,Routes } from 'react-router';
import SignUp from './Components/Auth/SignUp';
import Login from './Components/Auth/Login';
import Home from './Components/Pages/Home';
import Reset from './Components/Auth/Reset';
import ComposeMail from './Components/Pages/ComposeMail';
import Header from './Components/Navbar/Navbar';
import Sent from './Components/Pages/SentBoxAndInbox/SentBox';
import Inbox from './Components/Pages/SentBoxAndInbox/Inbox'
import Maildetail from './Components/Pages/Maildetail';
import { useSelector } from 'react-redux';
  function App() {
   const isLogged =useSelector((state)=>state.auth.isLogged)
  return (
<div className='theme'>
<Header></Header>
 <Routes>
 <Route  path='/login' element={<Login></Login>}></Route>
 <Route  path="/signup" element={<SignUp></SignUp>}></Route>
 <Route path="/forget" element={<Reset></Reset>}></Route>
 <Route  index element={<Home />} />


 {isLogged && (
            <>
              <Route path="/composemail" element={<ComposeMail />} />
              <Route path="/home" element={<Home />} />
              <Route path="/sentmails" element={<Sent />} />
              <Route path="/maildetail/:id/:userid/:userchoice" element={<Maildetail />} />
              <Route path="/inbox" element={<Inbox />} />
            </>
          )}
</Routes> 
</div>
 ); 

}

export default App;
