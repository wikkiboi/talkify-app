import { FormEvent, useEffect, useState } from "react";
import getUserSpaces from "../api/user/getUserSpaces";
import { Spaces } from "../types/types";
import createSpace from "../api/space/createSpace";
import { Link } from "react-router-dom";

export default function SpaceList() {
  const [userSpaces, setUserSpaces] = useState<Spaces[]>([]);
  const [newSpaceName, setNewSpaceName] = useState<string>("");

  const fetchSpaces = async () => {
    const spaces = await getUserSpaces();
    if (spaces) {
      setUserSpaces(spaces);
    } else {
      setUserSpaces([]);
      console.error("Failed to load spaces.");
    }
  };

  useEffect(() => {
    fetchSpaces();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newSpace = await createSpace(newSpaceName);
    if (newSpace) {
      fetchSpaces();
      setNewSpaceName("");
    }
  }

  return (
    <div>
      <div>Space List</div>
      <ul>
        {userSpaces.map((space) => (
          <Link key={space.spaceId} to={`/${space.spaceId}`}>
            {space.name}
          </Link>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          id="space-name"
          name="space-name"
          value={newSpaceName}
          onChange={(e) => setNewSpaceName(e.target.value)}
        />
        <button>Create New Space</button>
      </form>
    </div>
  );
}
