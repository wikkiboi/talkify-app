import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import Friends from "../pages/Friends";
import UserLayout from "../layout/UserLayout";
import SpacePage from "../pages/SpacePage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route element={<UserLayout />}>
      <Route path="/dashboard/" element={<Dashboard />} />
      <Route path="/channels/:spaceId/:channelId" element={<SpacePage />} />
      path="channels/:"
      <Route path="/friends" element={<Friends />} />
    </Route>
  </Routes>
);

export default AppRoutes;
