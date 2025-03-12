import axios from "axios";

export default async function getChannel(spaceId: string) {
  const API_URL = `api/space/${spaceId}/channels`; // Adjust the endpoint to fetch all channels
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`http://localhost:3000/${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Fetched channels:", response.data); // Log the response for debugging
    return response.data; // Assuming response.data contains the channels
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Get Channel Data failed:",
        error.response?.data?.message || error.message
      );
    } else if (error instanceof Error) {
      console.error("Unexpected error:", error.message);
    }
    return null;
  }
}
