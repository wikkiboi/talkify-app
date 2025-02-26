import { Routes, Route } from "react-router-dom";
import CreateServer from "../pages/createServer";
import WelcomePage from "../pages/welcomePage";
import LoginPage from "../pages/LoginPage";
import SocketChat from "../SocketChat";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/create-server" element={<CreateServer />} />
    <Route path="/dashboard" element={<SocketChat />} />
  </Routes>
);

export default AppRoutes;
