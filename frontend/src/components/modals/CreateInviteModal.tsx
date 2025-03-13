import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getSpaceInvites from "../../api/space/getSpaceInvites";
import { SpaceInvite } from "../../types/types";
import createSpaceInvite from "../../api/space/createSpaceInvite";

interface CreateInviteModalProps {
  setModalType: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateInviteModal({
  setModalType,
}: CreateInviteModalProps) {
  const { spaceId } = useParams<{ spaceId: string }>();
  const [validInvites, setValidInvites] = useState<SpaceInvite[]>([]);

  useEffect(() => {
    async function fetchInvites() {
      if (!spaceId) return;
      const invites = await getSpaceInvites(spaceId);
      if (!invites) {
        throw new Error("Failed to get invites");
      }

      setValidInvites(invites.invites);
      console.log(invites);
    }

    fetchInvites();
  }, [spaceId]);

  async function handleCreateInvite() {
    console.log("called");
    if (!spaceId) return;
    const updatedInviteList = await createSpaceInvite(spaceId);
    if (!updatedInviteList) {
      throw new Error("Failed to create invite code");
    }
    setValidInvites((prev) => [
      ...prev,
      updatedInviteList.invite[updatedInviteList.invite.length - 1],
    ]);
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Valid invite codes</h3>

        {/* Invite List */}
        <div className="friends-list">
          {validInvites &&
            validInvites.map((invite) => (
              <div key={invite._id} className="">
                {invite.code}
              </div>
            ))}
        </div>

        <button onClick={handleCreateInvite}>Create New Invite Code</button>
        <button onClick={() => setModalType(false)}>Cancel</button>
      </div>
    </div>
  );
}
