import axios from "axios";
import { Spaces } from "../../types/types";

export default async function getUserSpaces() {
  const API_URL = "api/user/spaces";
  const token = localStorage.getItem("token");
  try {
    const userSpaces = await axios.get<{ spaces: Spaces[] }>(
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
        "Login failed:",
        error.response?.data?.message || error.message
      );
    } else if (error instanceof Error) {
      console.error("Unexpected error: ", error.message);
    }
    return null;
  }
}
