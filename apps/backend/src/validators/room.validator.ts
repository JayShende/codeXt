import { z } from "zod";

const createRoom = z.object({
  body: z.object({
    roomName: z
      .string({ message: "Room Name must be a valid String" })
      .optional(),
  }),
});

const deleteRoom = z.object({
  body: z.object({
    roomId: z.string({ message: "roomId Name must be a valid String" }),
    roomSlug: z.string({ message: "roomSlug Name must be a valid String" }),
  }),
});

export default {
  createRoom,
  deleteRoom
};
