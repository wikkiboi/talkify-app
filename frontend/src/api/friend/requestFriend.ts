import axios from "axios";
import { UserFriend } from "../../types/types";

export default async function requestFriend(friendId: string) {
  const API_URL = `api/friend/${friendId}/request`;
  const token = localStorage.getItem("token");
  console.log(localStorage.getItem("token"));
if (token) {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode payload
    console.log(payload);
} else {
    console.log("No token found in localStorage.");
}

  try {
    const updatedFriendsList = await axios.post<{ userFriends: UserFriend[] }>(
      `http://localhost:3000/${API_URL}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return updatedFriendsList.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Failed to send friend request:",
        error.response?.data?.message || error.message
      );
    } else if (error instanceof Error) {
      console.error("Unexpected error: ", error.message);
    }
    return null;
  }
}