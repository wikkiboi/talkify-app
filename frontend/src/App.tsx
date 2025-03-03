import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import socket from "./socket";
import { useEffect } from "react";

function App() {
  socket.connect();
  const handleUserActivity = () => {
    socket.emit("userActive");
  };

  useEffect(() => {
    window.addEventListener("click", handleUserActivity);

    return () => {
      window.removeEventListener("click", handleUserActivity);
    };
  }, []);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
export default App;
