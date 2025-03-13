import { User } from "lucide-react";
import "@/assets/styles/chatColors.css";
import socket from "../../socket";
import { useEffect } from "react";
import { useUserContext } from "../../helper/UserContext";

export default function UserCurrentStatus() {
  const { userInfo, setUserInfo } = useUserContext();

  useEffect(() => {
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
  }, [setUserInfo]);

  return (
    <div className="mt-auto pt-4 border-t border-green-900">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center mr-3">
          <User size={24} className="text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-medium">{userInfo.username}</span>
          <span className="text-xs text-green-300">{userInfo.status}</span>
        </div>
      </div>
    </div>
  );
}
