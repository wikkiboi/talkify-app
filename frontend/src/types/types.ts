export type HexColor = `#${string}`;

export type Channel = {
  _id: string;
  createdAt: Date;
  name: string;
  updatedAt: Date;
  spaceId: string;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  status: UserStatus;
  friends: UserFriend[];
  spaces: UserSpace[];
  createdAt: Date;
  updatedAt: Date;
};

export type UserSpace = {
  name: string;
  spaceId: string;
  color: HexColor;
  lastVisitedChannel: string | null;
};

export type UserStatus = "online" | "offline" | "idle";

export type UserFriend = {
  _id: string;
  userId: string;
  username: string;
  status: UserStatus;
  friendStatus: "accepted" | "pending" | "requested";
};

export type Space = {
  _id: string;
  name: string;
  owner: string;
  admins: Admins[];
  members: Members[];
  color: HexColor;
  invites: SpaceInvite[];
};

export type SpaceInvite = {
  code: string;
  expiresAt: Date;
  maxUses: number;
  uses: number;
  _id: string;
};

export type Admins = {
  _id: string;
  userId: string;
  username: string;
};

export type Members = {
  _id: string;
  userId: string;
  username: string;
  status: UserStatus;
};

export type Message = {
  _id: string;
  sender: {
    userId: string;
    username: string;
  };
  text: string;
  channelId: string | null;
  groupId: string | null;
  dmUsers: [];
  timestamp: string;
};
