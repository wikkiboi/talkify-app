import { useEffect, useState } from "react";
import socket from "../socket";

export default function UserList({ users }) {
  const [userStatuses, setUserStatuses] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    socket.on("userStatusUpdate", ({ userId, status }) => {
      setUserStatuses((prev) => ({ ...prev, [userId]: status }));
    });

    return () => {
      socket.off("userStatusUpdate");
    };
  }, []);

  return <ul></ul>;
}
