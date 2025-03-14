import { Members } from "../../types/types";

interface UserListProps {
  users: Members[];
}

export default function MemberList({ users }: UserListProps) {
  return (
    <div className="members-sidebar">
      <h3 className="members-header">Space Members</h3>
      <div className="members-list">
        {users.length > 0 ? (
          users.map((user) => (
            <button key={user.userId} className="member-item">
              {user.username}: <span>{user.status}</span>
            </button>
          ))
        ) : (
          <p>No members in this space</p>
        )}
      </div>
    </div>
  );
}