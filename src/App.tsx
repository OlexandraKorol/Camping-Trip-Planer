
import './App.css'
import { Route, Routes } from 'react-router-dom';
import { WeatherPage } from './pages/WeatherPage';
import { BudgetPage } from './pages/BudgetPage';
import { PackingChecklist } from './pages/PackingChecklist';
import { TripPlanning } from './pages/TripPlanning';
import { NavBar } from './components/NavBar';
import { AuthPage } from './pages/AuthPage';
import { useAuth } from './context/AuthContext';

export default function App() {
  const { isUserLoggedIn } = useAuth();

  return (
    <>
      {isUserLoggedIn ? (
        <>
          <NavBar />
          <div>
            <Routes>
              <Route path="/" element={<TripPlanning />} />
              <Route path="/packing-checklist" element={<PackingChecklist />} />
              <Route path="/weather" element={<WeatherPage />} />
              <Route path="/budget" element={<BudgetPage />} />
            </Routes>
          </div>
        </>
      ) : (
        <AuthPage />
      )}
    </>
  );
}

