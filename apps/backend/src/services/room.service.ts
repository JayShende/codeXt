import { prisma } from "@repo/database";
import httpStatus from "http-status";
import ApiError from "../utils/api-error.js";

import { nanoid } from "nanoid";

const createRoom = async (userId: string) => {
  const slug = nanoid(5);
  console.log(slug);
  const room = await prisma.room.create({
    data: {
      userId: userId,
      roomId: slug,
    },
  });

  return room;
};

export default {
  createRoom,
};
