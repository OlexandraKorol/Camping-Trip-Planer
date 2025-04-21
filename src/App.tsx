
import './App.css'
import { Route, Routes } from 'react-router-dom';
import { WeatherPage } from './pages/WeatherPage';
import { BudgetPage } from './pages/BudgetPage';
import { PackingChecklist } from './pages/PackingChecklist';
import { TripPlanning } from './pages/TripPlanning';
import { NavBar } from './components/NavBar';

export default function App() {


  return (
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

  );
}

