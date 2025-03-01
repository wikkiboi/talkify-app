import axios from "axios";

export default async function login(usernameOrEmail: string, password: string) {
  const API_URL = "api/auth/login";

  try {
    const loginToken = await axios.post(`http://localhost:3000/${API_URL}`, {
      usernameOrEmail,
      password,
    });

    const { token } = loginToken.data;

    return token;
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
