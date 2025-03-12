import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import UserLayout from "../layout/UserLayout";
import SpacePage from "../pages/SpacePage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route element={<UserLayout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/channels/:spaceId/:channelId" element={<SpacePage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
