import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import socket from "./socket";

function App() {
  socket.connect();
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
export default App;
