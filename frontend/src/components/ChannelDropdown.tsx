import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

interface ChannelDropdownProps {
  channelId: string;
  onEdit: (channelId: string) => void;
  onDelete: (channelId: string) => Promise<void>;
}

export default function ChannelDropdown({
  channelId,
  onEdit,
  onDelete,
}: ChannelDropdownProps) {
  const { spaceId } = useParams();
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
  }>({
    top: 0,
    left: 0,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        showDropdown &&
        target &&
        !target.closest(".dropdown-menu") &&
        !target.closest(".ellipsis-btn")
      ) {
        setShowDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showDropdown]);

  if (!spaceId) {
    console.error("Space not found");
    return null;
  }

  if (!channelId) {
    return null;
  }

  const toggleDropdown = (event: React.MouseEvent) => {
    event.stopPropagation();
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + 5,
      left: rect.left + rect.width + 5,
    });
    setShowDropdown((prev) => (prev === channelId ? null : channelId));
  };

  return (
    <div className="ellipsis-container">
      <button className="ellipsis-btn" onClick={toggleDropdown}>
        ⋮
      </button>
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="dropdown-menu"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            position: "absolute",
          }}
        >
          <div className="arrow-up"></div>
          <button onClick={() => onEdit(channelId)}>Edit</button>
          <button onClick={() => onDelete(channelId)}>Delete</button>
          <button onClick={() => setShowDropdown(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
