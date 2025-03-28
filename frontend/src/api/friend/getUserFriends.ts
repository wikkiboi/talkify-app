import axios from "axios";
import { UserFriend } from "../../types/types";

export default async function getUserFriends() {
  const API_URL = `api/friend/me`;
  const token = localStorage.getItem("token");

  try {
    const userFriendsList = await axios.get<{ userFriends: UserFriend[] }>(
      `http://localhost:3000/${API_URL}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return userFriendsList.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Failed to get friends:",
        error.response?.data?.message || error.message
      );
    } else if (error instanceof Error) {
      console.error("Unexpected error: ", error.message);
    }
    return { userFriends: [] };
  }
}
