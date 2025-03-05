import { useEffect, useState } from "react";
import getUserInfo, { User } from "../api/user/getUserInfo";
import socket from "../socket";

export default function UserStatus() {
  const [userInfo, setUserInfo] = useState<User>();
  useEffect(() => {
    async function fetchUserInfo() {
      const user = await getUserInfo();
      if (user) {
        setUserInfo(user);
      } else {
        console.error("Failed to get user");
      }
    }

    fetchUserInfo();

    socket.on("userStatusUpdate", ({ username, status }) => {
      setUserInfo((prev) =>
        prev && prev.username === username && prev.status !== status
          ? { ...prev, status }
          : prev
      );
    });

    return () => {
      socket.off("userStatusUpdate");
    };
  }, []);

  return (
    <>
      {userInfo && (
        <div>
          <h2>
            {userInfo.username}: {userInfo.status}
          </h2>
        </div>
      )}
    </>
  );
}