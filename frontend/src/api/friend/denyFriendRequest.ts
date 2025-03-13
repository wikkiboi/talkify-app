import axios from "axios";
import { UserFriend } from "../../types/types";

export default async function denyRequest(friendId: string) {
  const API_URL = `api/friend/${friendId}/deny`;
  const token = localStorage.getItem("token");
  try {
    const updatedFriendsList = await axios.delete<{
      userFriends: UserFriend[];
    }>(`http://localhost:3000/${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return updatedFriendsList.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Failed to remove friend:",
        error.response?.data?.message || error.message
      );
    } else if (error instanceof Error) {
      console.error("Unexpected error: ", error.message);
    }
    return null;
  }
}
