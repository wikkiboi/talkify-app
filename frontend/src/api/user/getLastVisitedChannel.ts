import axios from "axios";

export default async function getLastVisitedChannel(spaceId: string) {
  const API_URL = `api/user/${spaceId}/lastVisited`;
  const token = localStorage.getItem("token");
  try {
    const channel = await axios.get<{ channel: string }>(
      `http://localhost:3000/${API_URL}`,
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
        "Failed to get last visited channels:",
        error.response?.data?.message || error.message
      );
    } else if (error instanceof Error) {
      console.error("Unexpected error: ", error.message);
    }
    return null;
  }
}
