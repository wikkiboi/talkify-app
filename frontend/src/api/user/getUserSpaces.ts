import axios from "axios";
import { UserSpace } from "../../types/types";

export default async function getUserSpaces() {
  const API_URL = "api/user/spaces";
  const token = localStorage.getItem("token");
  try {
    const userSpaces = await axios.get<{ spaces: UserSpace[] }>(
      `http://localhost:3000/${API_URL}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return userSpaces.data.spaces;
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
