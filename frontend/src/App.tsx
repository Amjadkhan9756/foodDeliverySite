import {BrowserRouter,Routes,Route} from "react-router-dom"
import  Home from "./pages/Home";
import Login from "./pages/Login";
import toaster from "react-hot-toast";


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
    <toaster/>
    </BrowserRouter>

    </>
  )
}

export default App;