import axios from "axios";

export default async function createSpace(name: string) {
  const API_URL = "api/space/create";

  try {
    const createdSpace = await axios.post(`http://localhost:3000/${API_URL}`, {
      name,
    });

    return createdSpace;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Create Space failed:",
        error.response?.data?.message || error.message
      );
    } else if (error instanceof Error) {
      console.error("Unexpected error: ", error.message);
    }
    return null;
  }
}
