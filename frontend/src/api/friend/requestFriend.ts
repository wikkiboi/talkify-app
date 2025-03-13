import axios from "axios";

export default async function requestFriend(friendId: string) {
  const API_URL = `api/friend/${friendId}/request`;
  const token = localStorage.getItem("token");

  try {
    const user = await axios.post(
      `http://localhost:3000/${API_URL}`,
//ADD THIS PART HERE
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return user.data.user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Failed to update last visited channel:",
        error.response?.data?.message || error.message
      );
    } else if (error instanceof Error) {
      console.error("Unexpected error: ", error.message);
    }
    return null;
  }
}