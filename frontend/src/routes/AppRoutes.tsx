import { Routes, Route } from "react-router-dom";
import CreateServer from "../pages/createServer";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../components/SpaceList";
import SpacePage from "../pages/SpacePage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/create-server" element={<CreateServer />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/:spaceId" element={<SpacePage />} />
  </Routes>
);

export default AppRoutes;
