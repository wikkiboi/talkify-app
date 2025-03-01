import axios from "axios";

export default async function register(
  username: string,
  email: string,
  password: string
) {
  const API_URL = "api/auth/register";

  try {
    const loginToken = await axios.post(`http://localhost:3000/${API_URL}`, {
      username,
      email,
      password,
    });

    const { token } = loginToken.data;

    return token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Register failed:",
        error.response?.data?.message || error.message
      );
    } else if (error instanceof Error) {
      console.error("Unexpected error: ", error.message);
    }
    return null;
  }
}
