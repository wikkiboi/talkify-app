import { useState, FormEvent, useEffect } from "react";
import socket from "../socket";

type Chatter = {
  sender: string;
  msg: string;
  timeStamp: string;
};

// Test implementation for now so might look messy
export default function SocketChat() {
  const [msg, setMsg] = useState("");
  const [receivedMsg, setReceivedMsg] = useState<Chatter>({
    sender: "",
    msg: "",
    timeStamp: "",
  });
  const [displayedMsgs, setDisplayedMsgs] = useState<Chatter[]>([]);

  socket.on("connect", () => {
    console.log(`You connected with id: ${socket.id}`);
  });

  // This is where the sent message data is received from the backend. Comes in an object {}.
  socket.on("receive-message", (msgData: Chatter) => {
    setReceivedMsg(msgData);
    if (receivedMsg.msg !== "") {
      console.log(receivedMsg);
    }
  });

  useEffect(() => {
    if (receivedMsg.msg !== "") {
      setDisplayedMsgs((prev) => [
        ...prev,
        {
          sender: receivedMsg.sender,
          msg: receivedMsg.msg,
          timeStamp: receivedMsg.timeStamp,
        },
      ]);
      setReceivedMsg({
        sender: "",
        msg: "",
        timeStamp: "",
      });
    }
  }, [receivedMsg]);

  // sends input message to the backend
  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (msg === "") return;
    socket.emit("send-message", { msg, sender: socket.id });
    setMsg("");
  }

  const msgElements = displayedMsgs.map((message) => {
    const key = `${message.sender}-${message.timeStamp}`;
    return (
      <p key={key}>
        {message.sender}: {message.msg}, {message.timeStamp}
      </p>
    );
  });

  return (
    <>
      <div>
        <input
          name="msg"
          type="text"
          placeholder="Enter text"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button onClick={handleSubmit}>Send</button>
      </div>
      <div>{msgElements}</div>
    </>
  );
}
