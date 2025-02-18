import { Routes, Route } from "react-router-dom";
import CreateServer from "../pages/createServer";
import WelcomePage from "../pages/welcomePage";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/create-server" element={<CreateServer />} />  {}
    </Routes>
);

export default AppRoutes;
