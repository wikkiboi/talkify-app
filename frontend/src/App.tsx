import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import socket from "./socket";
import { useEffect } from "react";
import "./index.css";
import { UserProvider } from "./helper/UserContext";

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
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </Router>
  );
}
export default App;
