import { prisma } from "@repo/database";
import httpStatus from "http-status";
import ApiError from "../utils/api-error.js";

const updateEditorDefaultLanguage = async (body: {
  roomSlug: string;
  language: string;
}) => {
  // check if roomSlug is valid or Not
  const room = await prisma.room.findUnique({
    where: {
      roomSlug: body.roomSlug,
    },
  });
  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid Room Slug");
  }

  // Find The Snippet For The Room
  const snippet = await prisma.snippet.update({
    where: {
      roomId: room.id,
    },
    data: {
      language: body.language,
    },
  });
  return snippet
};

export default {
  updateEditorDefaultLanguage,
};
