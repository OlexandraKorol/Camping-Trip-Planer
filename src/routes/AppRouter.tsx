import { Routes, Route } from "react-router-dom";
import { BudgetPage } from "../pages/BudgetPage";
import { PackingChecklist } from "../pages/PackingChecklistPage";
import { TripPlanning } from "../pages/TripPlanningPage";
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
