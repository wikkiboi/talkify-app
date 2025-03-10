import axios from "axios";
import { Space, UserSpace } from "../../types/types";

export default async function deleteSpace(spaceId: string) {
  const API_URL = `api/space/${spaceId}/leave`;
  const token = localStorage.getItem("token");

  try {
    const space = await axios.delete<{
      updatedSpace: Space;
      userSpaces: UserSpace[];
    }>(`http://localhost:3000/${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return space.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Delete space failed:",
        error.response?.data?.message || error.message
      );
    } else if (error instanceof Error) {
      console.error("Unexpected error: ", error.message);
    }
    return null;
  }
}
