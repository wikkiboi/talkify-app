import axios from "axios";
import { Message } from "../../types/types";

export default async function getPrivateDmMsgs(dmId: string) {
  const API_URL = `api/dm/${dmId}/msgs`;
  const token = localStorage.getItem("token");
  try {
    const dmMsgs = await axios.get<{ messages: Message[] }>(
      `http://localhost:3000/${API_URL}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return dmMsgs.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Failed to get user info:",
        error.response?.data?.message || error.message
      );
    } else if (error instanceof Error) {
      console.error("Unexpected error: ", error.message);
    }
    return null;
  }
}
