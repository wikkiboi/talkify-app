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
  spaceId: { _id: string; defaultChannel: string };
  color: HexColor;
  lastVisitedChannel?: string | null;
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
  icon: string;
  owner: string;
  admins: Admins[];
  members: Members[];
  color: HexColor;
  defaultChannel: string;
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
  conversationId: string;
  timestamp?: string;
  createdAt: Date;
};

export type PrivateDM = {
  _id: string;
  participants: [
    { _id: string; username: string },
    { _id: string; username: string }
  ];
  createdAt: Date;
  updatedAt: Date;
};

export type GroupDm = {
  name: string;
  participants: { _id: string; username: string }[];
  owner: string;
  createdAt: Date;
  updatedAt: Date;
};
