
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import LoginPage from './pages/Login.tsx';
import ProtectedRoute from "./component/protectedRoute.tsx";
import PublicRoute from "./component/publicRoute.tsx";
import SelectRole from './pages/SelectRole.tsx';
import Navbar from './component/navbar.tsx';
import Account from './pages/Account.tsx';



export default function App() {
  return (
    <div className="font-sans">
      <BrowserRouter>
        <Navbar />
        <Routes>


          <Route path='select-role' element={<SelectRole />} />
          <Route path='account' element={<Account />} />

          <Route element={<PublicRoute />}>
            <Route path='/login' element={<LoginPage />} />
          </Route>
          <Route element={<ProtectedRoute />} >
            <Route path='/' element={<Home />} />

          </Route>



        </Routes>

      </BrowserRouter>
    </div>
  );
}