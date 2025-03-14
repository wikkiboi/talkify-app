import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { UserSpace } from "../types/types";
import getUserSpaces from "../api/user/getUserSpaces";
import getUserInfo from "../api/user/getUserInfo";
import UserSidebar from "../components/user/UserSidebar";
import { useUserContext } from "../helper/UserContext";

export default function UserLayout() {
  const { spaceId } = useParams();
  const [spaces, setSpaces] = useState<UserSpace[]>([]);
  const { userInfo, setUserInfo } = useUserContext();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserInfo();
      if (userData) {
        if (userData.username === userInfo.username) return;
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
  }, [spaceId, setUserInfo, userInfo.username]);

  return (
    <div className="container">
      <div className="spaces-sidebar">
        <UserSidebar spaces={spaces} setSpaces={setSpaces} />
      </div>

      {/* Uncomment to view WIP UserStatus. Correctly displays username and online status. Should display in a similar location to Discord. */}
      {/* <UserCurrentStatus /> */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
