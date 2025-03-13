import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { UserSpace, UserStatus } from "../types/types";
import getUserSpaces from "../api/user/getUserSpaces";
import getUserInfo from "../api/user/getUserInfo";
import UserSidebar from "../components/user/UserSidebar";

export default function UserLayout() {
  const { spaceId } = useParams();
  const [spaces, setSpaces] = useState<UserSpace[]>([]);

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
        setUserInfo({
          username: userData.username,
          status: userData.status,
        });
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

    console.log("called");
  }, [spaceId]);

  return (
    <div className="container">
      <div className="spaces-sidebar">
        <UserSidebar spaces={spaces} />
      </div>

      {/* Uncomment to view WIP UserStatus. Correctly displays username and online status. Should display in a similar location to Discord. */}
      {/* <UserCurrentStatus
        username={userInfo.username}
        status={userInfo.status}
        setUserInfo={() => setUserInfo}
      /> */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
