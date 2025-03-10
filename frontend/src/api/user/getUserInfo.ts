import axios from "axios";

export interface User {
  status: string;
  _id: string;
  username: string;
  email: string;
  password: string;
  friends: [];
  spaces: [];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default async function getUserInfo() {
  const API_URL = "api/user/me";
  const token = localStorage.getItem("token");
  try {
    const user = await axios.get<User>(`http://localhost:3000/${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return user.data;
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
