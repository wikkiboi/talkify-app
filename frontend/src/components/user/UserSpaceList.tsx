import { useNavigate, useParams } from "react-router-dom";
import { UserSpace } from "../../types/types";

export default function UserSpaceList({ spaces }: { spaces: UserSpace[] }) {
  const { spaceId } = useParams<{ spaceId: string }>();
  const navigate = useNavigate();
  const handleSpaceClick = (spaceId: string, defaultChannel?: string) => {
    navigate(`/channels/${spaceId}/${defaultChannel}`);
  };

  return (
    <div className="space-list">
      {spaces.map((space) => (
        <button
          key={space.spaceId._id}
          className={`space-item ${
            space.spaceId._id === spaceId ? "active" : ""
          }`}
          onClick={() =>
            handleSpaceClick(
              space.spaceId._id,
              space.lastVisitedChannel ?? space.spaceId.defaultChannel
            )
          }
        >
          {space.name.charAt(0).toUpperCase()}
        </button>
      ))}
    </div>
  );
}
