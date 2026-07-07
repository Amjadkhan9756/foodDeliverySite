import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppProvider } from './context/AppContext.tsx';


export const authService = "http://127.0.0.1:3000";




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="915359388751-69df2m12lgbatldedqvsor4e84fhm5mp.apps.googleusercontent.com">
      <AppProvider>
        <App />

      </AppProvider>
    </GoogleOAuthProvider>;


  </StrictMode>,
)
