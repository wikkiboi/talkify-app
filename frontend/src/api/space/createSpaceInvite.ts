import axios from "axios";
import { SpaceInvite } from "../../types/types";

export default async function createSpaceInvite(
  spaceId: string,
  expiration?: number,
  maxUses?: number
) {
  const API_URL = `api/space/${spaceId}/invite`;
  const token = localStorage.getItem("token");
  try {
    const updatedSpace = await axios.post<{ invite: SpaceInvite }>(
      `http://localhost:3000/${API_URL}`,
      { expiration, maxUses },
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
        "Create space invite failed:",
        error.response?.data?.message || error.message
      );
    } else if (error instanceof Error) {
      console.error("Unexpected error: ", error.message);
    }
    return null;
  }
}
