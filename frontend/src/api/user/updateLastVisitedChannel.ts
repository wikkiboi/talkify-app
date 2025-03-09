import axios from "axios";

export default async function getLastVisitedChannel(
  spaceId: string,
  channelId: string
) {
  const API_URL = `api/user/${spaceId}/lastVisited`;
  const token = localStorage.getItem("token");
  try {
    const channel = await axios.put<{ channel: string }>(
      `http://localhost:3000/${API_URL}`,
      { channelId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return channel.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
    } else if (error instanceof Error) {
      console.error("Unexpected error: ", error.message);
    }
    return null;
  }
}
