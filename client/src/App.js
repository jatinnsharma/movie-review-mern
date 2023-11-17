import { Route, Routes } from "react-router-dom";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Navbar from "./components/user/Navbar";
import Home from "./components/Home";
import EmailVerification from "./components/auth/EmailVerification";
import ForgetPassword from "./components/auth/ForgetPassword";
import ConfirmPassword from "./components/auth/ConfirmPassword";

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/auth/signin' element={<Signin/>}/>
       <Route path='/auth/signup' element={<Signup/>}/>
       <Route path='/auth/verification' element={<EmailVerification/>}/>
       <Route path='/auth/forget-password' element={<ForgetPassword/>}/>
       <Route path='/auth/confirm-password' element={<ConfirmPassword/>}/>
      </Routes>
    </>
  );
}

export default App;
