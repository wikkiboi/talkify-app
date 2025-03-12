import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { UserSpace, UserStatus } from "../types/types";
import getUserSpaces from "../api/user/getUserSpaces";
import Sidebar from "../components/Sidebar";
import NewServerOptionsModal from "../components/NewServerOptionsModal";
import getUserInfo from "../api/user/getUserInfo";
import UserCurrentStatus from "../components/UserCurrentStatus";

export default function UserLayout() {
  const { spaceId } = useParams();
  const [spaces, setSpaces] = useState<UserSpace[]>([]);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [userInfo, setUserInfo] = useState<{
    username: string;
    status: UserStatus;
  }>({
    username: "",
    status: "offline",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserInfo();
      if (userData) {
        setUserInfo({ username: userData.username, status: userData.status });
        console.log(userInfo);
      }
    };
    const fetchSpaces = async () => {
      const spacesData = await getUserSpaces();
      if (spacesData) {
        setSpaces(spacesData);
      }
    };
    fetchSpaces();
    fetchUser();
  }, [spaceId]);

  return (
    <div className="container">
      <div className="spaces-sidebar">
        <Sidebar spaces={spaces} showModal={() => setShowOptionsModal(true)} />
      </div>

      <UserCurrentStatus
        username={userInfo.username}
        status={userInfo.status}
        setUserInfo={() => setUserInfo}
      />
      <main>
        <Outlet />
      </main>
      {showOptionsModal && (
        <NewServerOptionsModal showModal={() => setShowOptionsModal(false)} />
      )}
    </div>
  );
}
