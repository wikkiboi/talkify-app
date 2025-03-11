import axios from "axios";
import { PrivateDM } from "../../types/types";

export default async function createPrivateDm(dmId: string) {
  const API_URL = `api/dm/${dmId}/private`;
  const token = localStorage.getItem("token");
  try {
    const privateDM = await axios.get<PrivateDM>(
      `http://localhost:3000/${API_URL}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return privateDM.data;
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
