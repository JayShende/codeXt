import { prisma } from "@repo/database";
import "dotenv/config";
export default async function Page({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;
  const response = await checkRoomId(roomId);
  if (!response) {
    return <div className="font-bold text-xl text-red-400">The Slug {roomId} Dont Exist in Db</div>;
  }
  return <div className="font-bold text-xl text-emerald-400">The Slug Exist in the DB: {roomId}</div>;
}

async function checkRoomId(roomId: string) {
  try {
    const check = await prisma.room.findUnique({
      where: {
        roomId: roomId,
      },
    });
    console.log("Response", check);
    if (check == null) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("Some Error in Making the DB Call", error);
    return false;
  }
}
