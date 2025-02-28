import { useEffect, useState } from "react";
import getUserSpaces from "../api/user/getUserSpaces";
import { Spaces } from "../types/types";

export default function SpaceList() {
  const [userSpaces, setUserSpaces] = useState<Spaces[]>([]);
  useEffect(() => {
    const fetchSpaces = async () => {
      const spaces = await getUserSpaces();
      if (spaces) {
        setUserSpaces(spaces);
      } else {
        setUserSpaces([]);
        console.error("Failed to load spaces.");
      }
    };

    fetchSpaces();
  }, []);

  return (
    <div>
      <div>Space List</div>
      <ul>
        {userSpaces.map((space) => (
          <li key={space._id}>{space.name}</li>
        ))}
      </ul>
      <button>Create New Space</button>
    </div>
  );
}
