import socket from "./socket";
import SocketChat from "./SocketChat";

function App() {
  socket.connect();
  return (
    <>
      <div>Hi This is Talkify</div>
      <SocketChat />
    </>
  );
}

export default App;
