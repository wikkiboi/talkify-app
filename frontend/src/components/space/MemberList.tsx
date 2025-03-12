import { Members } from "../../types/types";

interface UserListProps {
  users: Members[];
}

export default function MemberList({ users }: UserListProps) {
  const userList = users.map((user) => {
    return (
      <li key={user.userId}>
        {user.username}: {user.status}
      </li>
    );
  });
  return (
    <div>
      Members List
      <ul>{userList}</ul>
    </div>
  );
}
