import axios from "axios";
import { SpaceInvite } from "../../types/types";

export default async function getSpaceInvites(spaceId: string) {
  const API_URL = `api/space/${spaceId}/invites`;
  const token = localStorage.getItem("token");

  try {
    const invites = await axios.get<{
      invites: SpaceInvite[];
    }>(`http://localhost:3000/${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return invites.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Get space failed:",
        error.response?.data?.message || error.message
      );
    } else if (error instanceof Error) {
      console.error("Unexpected error: ", error.message);
    }
    return null;
  }
}
