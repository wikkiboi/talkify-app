import axios from "axios";
import { GroupDm } from "../../types/types";

export default async function createGroupDm(
  participantIds: string[],
  groupName?: string
) {
  const API_URL = `api/dm/group/create`;
  const token = localStorage.getItem("token");
  try {
    const groupDM = await axios.post<GroupDm>(
      `http://localhost:3000/${API_URL}`,
      { participantIds, groupName },
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
