import axios from "axios";
import { UserStatus } from "../../types/types";

export default async function getUserStatus() {
  const API_URL = "api/user/status";
  const token = localStorage.getItem("token");
  try {
    const userStatus = await axios.get<{ status: UserStatus }>(
      `http://localhost:3000/${API_URL}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return userStatus.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Failed to get user spaces:",
        error.response?.data?.message || error.message
      );
    } else if (error instanceof Error) {
      console.error("Unexpected error: ", error.message);
    }
    return null;
  }
}
