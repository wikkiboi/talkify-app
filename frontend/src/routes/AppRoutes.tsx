import { Routes, Route } from "react-router-dom";
import CreateServer from "../pages/createServer";
import LoginPage from "../pages/LoginPage";
// import SpacePage from "../pages/SpacePage";
import ChatInterface from "../components/ChatBox";
import Dashboard from "../pages/Dashboard";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/create-server" element={<CreateServer />} />
    <Route path="/dashboard" element={<Dashboard />} />
    {/* <Route path="/channels/:spaceId" element={<SpacePage />} /> */}
    <Route path="/space/:spaceId" element={<ChatInterface />} />
    {/* <Route path="/channels/:spaceId/:channelId" element={<ChatInterface />} /> */}
  </Routes>
);

export default AppRoutes;
