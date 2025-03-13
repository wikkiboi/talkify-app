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
      {spaces.map((space) => {
        // Check if spaceId is valid before rendering
        const validSpaceId = space.spaceId?._id;
        if (!validSpaceId) return null; // Skip rendering if spaceId is invalid

        return (
          <button
            key={validSpaceId}
            className={`space-item ${validSpaceId === spaceId ? "active" : ""}`}
            onClick={() =>
              handleSpaceClick(
                validSpaceId,
                space.lastVisitedChannel ?? space.spaceId?.defaultChannel
              )
            }
          >
            {space.name.charAt(0).toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
