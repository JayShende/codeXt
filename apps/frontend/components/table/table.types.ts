export type ApiRoom = {
  id: string;
  name: string;
  ownerId: string;
  roomSlug: string;
  createdAt: string;
  expiresAt: string;
  snippetUpdatedAt: string;
};

export type RoomTable = {
  id: string;
  name: string;
  roomSlug: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
};
