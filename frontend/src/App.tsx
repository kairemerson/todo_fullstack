import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Login } from './components/auth/Login';
import { Signup } from './components/auth/Signup';
import { Home } from "./components/todo/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App; 
