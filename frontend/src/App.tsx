
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home.tsx"
import LoginPage from './pages/Login.tsx';
import ProtectedRoute from "./component/protectedRoute.tsx";
import PublicRoute from "./component/publicRoute.tsx";
import SelectRole from './pages/SelectRole.tsx';



export default function App() {
  return (
    <div className="font-sans">
      <BrowserRouter>
        <Routes>
          
          <Route element={<ProtectedRoute />} >
            <Route path='/' element={<Home/>} />
          </Route>


          <Route element={<PublicRoute />}>
            <Route path='/login' element={<LoginPage />} />
            <Route element={<SelectRole />} path="/select-role" />
          </Route>



        </Routes>

      </BrowserRouter>
    </div>
  );
}