export type Spaces = {
  name: string;
  spaceId: string;
};

export type UserSpaces = Spaces[];

export type Channel = {
  _id: string;
  createdAt: Date;
  name: string;
  updatedAt: Date;
};

export type Space = {
  _id: string;
  name: string;
  icon: string;
  owner: string;
  admins: Admins[];
  members: Members[];
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
  status: "online" | "idle" | "offline";
};
