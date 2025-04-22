import { Routes, Route } from "react-router-dom";
import { BudgetPage } from "../pages/BudgetPage";
import { PackingChecklist } from "../pages/PackingChecklist";
import { TripPlanning } from "../pages/TripPlanning";
import { WeatherPage } from "../pages/WeatherPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<TripPlanning />} />
      <Route path="/packing-checklist" element={<PackingChecklist />} />
      <Route path="/weather" element={<WeatherPage />} />
      <Route path="/budget" element={<BudgetPage />} />
    </Routes>
  );
};
