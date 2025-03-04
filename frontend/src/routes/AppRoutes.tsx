import { Routes, Route } from "react-router-dom";
import CreateServer from "../pages/createServer";
import LoginPage from "../pages/LoginPage";
import SpacePage from "../pages/SpacePage";
import ChatBox from "../components/ChatBox";
import Dashboard from "../pages/Dashboard";
import ChatAreaHome from "../pages/chatAreaPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/create-server" element={<CreateServer />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/channels/:spaceId" element={<SpacePage />} />
    <Route path="/channels/:spaceId/:channelId" element={<ChatBox />} />
    <Route path="/chatArea" element={<ChatAreaHome />} />
  </Routes>
);

export default AppRoutes;
