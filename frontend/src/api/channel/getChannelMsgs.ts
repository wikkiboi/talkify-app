import axios from "axios";

export default async function getChannelMsgs(
  spaceId: string,
  channelId: string
) {
  const API_URL = `api/channel/${spaceId}/${channelId}`;
  const token = localStorage.getItem("token");

  try {
    const space = await axios.get(`http://localhost:3000/${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return space.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Get Channel Msgs failed:",
        error.response?.data?.message || error.message
      );
    } else if (error instanceof Error) {
      console.error("Unexpected error: ", error.message);
    }
    return null;
  }
}
