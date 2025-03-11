import axios from "axios";
import { GroupDm, PrivateDM } from "../../types/types";

export default async function getAllUserDms() {
  const API_URL = `api/dm/me`;
  const token = localStorage.getItem("token");
  try {
    const groupDM = await axios.get<{
      privateDms: PrivateDM[];
      groupDms: GroupDm[];
    }>(`http://localhost:3000/${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return groupDM.data;
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
