import { User } from "lucide-react";
import "@/assets/styles/chatColors.css";
import socket from "../../socket";
import { useEffect } from "react";
import { UserStatus } from "../../types/types";

interface UserStatusProps {
  username: string;
  status: UserStatus;
  setUserInfo: React.Dispatch<
    React.SetStateAction<{
      username: string;
      status: string;
    }>
  >;
}

export default function UserCurrentStatus({
  username,
  status,
  setUserInfo,
}: UserStatusProps) {
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
          <span className="text-white font-medium">{username}</span>
          <span className="text-xs text-green-300">{status}</span>
        </div>
      </div>
    </div>
  );
}
