import { z } from "zod";

const createRoom = z.object({
  body: z.object({
    roomName: z.string({ message: "Room Name must be a valid String" })
      .optional(),
  }),
});

export default {
  createRoom,
};
