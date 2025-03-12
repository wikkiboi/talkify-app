import { UserSpace } from "../types/types";
import SpaceList from "./SpaceList";
import logo from "../assets/logo.png";

interface SidebarProps {
  spaces: UserSpace[];
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ spaces, showModal }: SidebarProps) {
  return (
    <div className="sidebar">
      <img src={logo} alt="Talkify Logo" className="sidebar-logo" />
      <SpaceList spaces={spaces} />
      <button className="create-space-btn" onClick={() => showModal(true)}>
        +
      </button>
    </div>
  );
}
