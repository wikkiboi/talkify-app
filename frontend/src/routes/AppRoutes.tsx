import { Routes, Route } from "react-router-dom";
import CreateServer from "../pages/createServer";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../components/SpaceList";
import SpacePage from "../pages/SpacePage";
import ChatBox from "../components/ChatBox";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/create-server" element={<CreateServer />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/channels/:spaceId" element={<SpacePage />} />
    <Route path="/channels/:spaceId/:channelId" element={<ChatBox />} />
  </Routes>
);

export default AppRoutes;
