// import { useEffect, useState } from "react";
// import getUserInfo, { User } from "../api/user/getUserInfo";
// import socket from "../socket";

// export default function UserStatus() {
//   const [userInfo, setUserInfo] = useState<User>();
//   useEffect(() => {
//     async function fetchUserInfo() {
//       const user = await getUserInfo();
//       if (user) {
//         setUserInfo(user);
//       } else {
//         console.error("Failed to get user");
//       }
//     }

//     fetchUserInfo();

//     socket.on("userStatusUpdate", ({ username, status }) => {
//       setUserInfo((prev) =>
//         prev && prev.username === username && prev.status !== status
//           ? { ...prev, status }
//           : prev
//       );
//     });

//     return () => {
//       socket.off("userStatusUpdate");
//     };
//   }, []);

//   return (
//     <>
//       {userInfo && (
//         <div>
//           <h2>
//             {userInfo.username}: {userInfo.status}
//           </h2>
//         </div>
//       )}
//     </>
//   );
// }
import { User } from "lucide-react"
import "@/assets/styles/chatColors.css"

interface UserStatusProps {
  username: string
  status?: "online" | "offline" | "away"
}

export default function UserStatus({ username, status = "online" }: UserStatusProps) {
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
  )
}

