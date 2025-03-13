import axios from "axios";

export default async function findUser(username: string) {
  const API_URL = `api/user/${username}/find`;
  const token = localStorage.getItem("token");
  try {
    const user = await axios.get<{ user: { _id: string; username: string } }>(
      `http://localhost:3000/${API_URL}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return user.data.user;
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
