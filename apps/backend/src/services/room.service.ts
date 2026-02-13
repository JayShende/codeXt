import { prisma } from "@repo/database";
import httpStatus from "http-status";
import ApiError from "../utils/api-error.js";

import { nanoid } from "nanoid";
import randomName from "@scaleway/random-name";

const createRoom = async (userId: string) => {
  const slug = nanoid(5);
  const roomName = randomName("codeXt");
  const room = await prisma.room.create({
    data: {
      ownerId: userId,
      name: roomName,
      roomSlug: slug,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      snippet: {
        create: {
          language: "typescript",
          code: "WelCome to CodeXt",
        },
      },
    },
  });

  return room;
};

const roomDetails = async (roomSlug: string) => {
  const details = await prisma.room.findUnique({
    where: {
      roomSlug,
    },
    include: {
      owner: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return details;
};


export default {
  createRoom,
  roomDetails,
};
