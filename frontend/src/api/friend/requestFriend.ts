import axios from "axios";

export default async function requestFriend(friendId: string) {
  const API_URL = `api/friend/${friendId}/request`;
  const token = localStorage.getItem("token");
  try {
    const updatedFriendsList = await axios.post(
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
