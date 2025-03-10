import axios from "axios";
import { Space, User } from "../../types/types";

export default async function createSpace(name: string) {
  const API_URL = "api/space/create";
  const token = localStorage.getItem("token");
  try {
    const createdSpace = await axios.post<{ space: Space; updatedUser: User }>(
      `http://localhost:3000/${API_URL}`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return createdSpace.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Create space failed:",
        error.response?.data?.message || error.message
      );
    } else if (error instanceof Error) {
      console.error("Unexpected error: ", error.message);
    }
    return null;
  }
}
