
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import HomePage from './Pages/home';
import KidsPage from './Pages/KidsPage';
import DevelopersPage from './Pages/DevelopersPage';
import BeginnersPage from './Pages/BeginnersPage';
import AuthPage from './Pages/AuthPage';
import OnboardingPage from './Pages/OnboardingPage';
import { Providers } from "./components/provider";


const router = createBrowserRouter([
 
  {
    path: "/",
    element: <HomePage />,
  
  },
  {
    path: "/kids",
    element: <KidsPage />
  },

  {
    path: "/developers",
    element: <DevelopersPage />
  },
  {
    path: "/beginners",
    element: <BeginnersPage />
  },

  {
    path: "/auth",
    element: <AuthPage />
  },
  {
    path: "/on-boarding",
    element: <OnboardingPage />
  }




 
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
    <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>
  
);