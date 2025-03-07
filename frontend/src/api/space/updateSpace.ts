import axios from "axios";
import { Space, UserSpace } from "../../types/types";

export default async function updateSpace(
  spaceId: string,
  name: string,
  color: string
) {
  const API_URL = `api/space/${spaceId}/update`;
  const token = localStorage.getItem("token");
  try {
    const updatedSpace = await axios.put<{
      userSpaces: UserSpace[];
      spaces: Space;
    }>(
      `http://localhost:3000/${API_URL}`,
      { name, color },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return updatedSpace.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Create Space failed:",
        error.response?.data?.message || error.message
      );
    } else if (error instanceof Error) {
      console.error("Unexpected error: ", error.message);
    }
    return null;
  }
}
