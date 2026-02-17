import { prisma } from "@repo/database";
import httpStatus from "http-status";
import ApiError from "../utils/api-error.js";

import { nanoid } from "nanoid";
import randomName from "@scaleway/random-name";

const createRoom = async (userId: string, roomName?: string) => {
  if (roomName == undefined) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Room name is Undefined");
  }
  const slug = nanoid(5);
  const roomNameGenerated = randomName("codeXt");
  if (roomName == "") {
    roomName = roomNameGenerated;
  }
  const room = await prisma.room.create({
    data: {
      ownerId: userId,
      name: roomName,
      roomSlug: slug,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      snippet: {
        create: {
          language: "typescript",
          code: "//WelCome to CodeXt App 🚀",
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

const allUserRoomsData = async (userId: string) => {
  const allData = await prisma.room.findMany({
    where: {
      ownerId: userId,
    },
    include: {
      snippet: {
        select: {
          updatedAt: true,
        },
      },
    },
  });

   return allData.map(({ snippet, ...room }) => ({
    ...room,
    snippetUpdatedAt: snippet?.updatedAt ?? null,
  }));
};

export const deleteRoom = async (
  roomId: string,
  roomSlug: string,
  userId: string,
) => {
  // check if the roomId, roomSlug belongs to the user
  const roomDetails = await prisma.room.findUnique({
    where: {
      id: roomId,
      roomSlug: roomSlug,
    },
  });
  console.log(roomDetails);
  if (roomDetails == null) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "No Room Exist With the Given roomId, roomSlug",
    );
  }

  // check if the room fetched belongs to the user Or not
  if (roomDetails.ownerId != userId) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "The Room Don't Belong to The User",
    );
  }

  // Proceed with the Deleteion of the Room

  const response = await prisma.room.delete({
    where: {
      roomSlug: roomSlug,
      id: roomId,
      ownerId: userId,
    },
  });

  return response;
};

export default {
  createRoom,
  roomDetails,
  allUserRoomsData,
  deleteRoom,
};
