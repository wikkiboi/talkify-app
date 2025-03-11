import axios from "axios";

export default async function sendMessage(spaceId: string, channelId: string, message: string) {
  const API_URL = `api/messages/${spaceId}/${channelId}`;
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `http://localhost:3000/${API_URL}`,
      { message },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Handle the AxiosError, which has a response property
      console.error("Send Message failed:", error.response?.data?.message || error.message);
    } else if (error instanceof Error) {
      // Handle other types of error
      console.error("Send Message failed:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
    return null;
  }
}
