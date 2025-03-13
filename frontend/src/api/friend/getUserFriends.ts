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

    // Assuming the data structure has a 'friends' array where each friend has a 'friendStatus' property
    const friends = userFriendsList.data.friends || [];

    // Filter out pending friend requests
    const pendingRequests = friends.filter((friend: any) => friend.friendStatus === "pending");

    return {
      friends: friends.filter((friend: any) => friend.friendStatus === "accepted"), // Accepted friends
      pendingRequests, // Pending friend requests
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Failed to get friends:",
        error.response?.data?.message || error.message
      );
    } else if (error instanceof Error) {
      console.error("Unexpected error: ", error.message);
    }
    return { friends: [], pendingRequests: [] };
  }
}
