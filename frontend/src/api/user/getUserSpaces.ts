import axios from "axios";
import { Space } from "../../types/types"; // Correct import of Space

export default async function getUserSpaces(): Promise<Space[] | null> {  // Corrected return type
  const API_URL = "api/user/spaces";
  const token = localStorage.getItem("token");
  try {
    const userSpaces = await axios.get<{ spaces: Space[] }>(  // Corrected expected response type
      `http://localhost:3000/${API_URL}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return userSpaces.data.spaces; // Return an array of Space objects
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
