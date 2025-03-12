import axios from "axios";
import { Space, UserSpace } from "../../types/types";

export default async function joinSpace(inviteCode: string) {
  const API_URL = "api/space/join";
  const token = localStorage.getItem("token");
  try {
    const joinedSpace = await axios.post<{
      space: Space;
      userSpaces: UserSpace[];
    }>(
      `http://localhost:3000/${API_URL}`,
      { inviteCode },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return joinedSpace.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Failed to join space:",
        error.response?.data?.message || error.message
      );
    } else if (error instanceof Error) {
      console.error("Unexpected error: ", error.message);
    }
    return null;
  }
}
