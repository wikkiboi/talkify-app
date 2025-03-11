import axios from "axios";
import { GroupDm } from "../../types/types";

export default async function addToGroupDm(groupId: string) {
  const API_URL = `api/dm/${groupId}/add`;
  const token = localStorage.getItem("token");
  try {
    const updatedGroupDM = await axios.put<GroupDm>(
      `http://localhost:3000/${API_URL}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return updatedGroupDM.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Failed add user to group DM:",
        error.response?.data?.message || error.message
      );
    } else if (error instanceof Error) {
      console.error("Unexpected error: ", error.message);
    }
    return null;
  }
}
