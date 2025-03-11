import axios from "axios";
import { GroupDm } from "../../types/types";

export default async function deleteGroupDM(groupId: string) {
  const API_URL = `api/dm/${groupId}/create`;
  const token = localStorage.getItem("token");
  try {
    const groupDM = await axios.delete<GroupDm>(
      `http://localhost:3000/${API_URL}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return groupDM.data;
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
