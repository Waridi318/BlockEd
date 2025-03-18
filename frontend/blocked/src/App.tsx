import "@rainbow-me/rainbowkit/styles.css"

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./Pages/home"
import KidsPage from "./Pages/KidsPage"
import DevelopersPage from "./Pages/DevelopersPage"
import BeginnersPage from "./Pages/BeginnersPage"
import AuthPage from "./Pages/AuthPage"
import OnboardingPage from "./Pages/OnboardingPage"





const App = () => {


  return (
  
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/kids" element={<KidsPage />} />
              <Route path="/developers" element={<DevelopersPage />} />
              <Route path="/beginners" element={<BeginnersPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/on-boarding" element={<OnboardingPage />} />
            </Routes>
          </Router>

    
       
  )
}


export default App

