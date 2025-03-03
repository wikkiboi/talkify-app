import SpaceList from "../components/SpaceList";
import UserStatus from "../components/UserStatus";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <SpaceList />
      <UserStatus />
    </div>
  );
}
