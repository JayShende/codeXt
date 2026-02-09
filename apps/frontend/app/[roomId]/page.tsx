import EditorPage from "@/components/editor";
import { prisma } from "@repo/database";
import "dotenv/config";
import jwt from "jsonwebtoken";
export default async function Page({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;
  const response = await checkRoomId(roomId);
  if (!response) {
    return (
      <div className="font-bold text-xl text-red-400">
        The Slug {roomId} Dont Exist in Db
      </div>
    );
  }
  const JWT_SECRET = process.env.WS_JWT_SECRET || "";
  console.log(JWT_SECRET);
  // Generate the Token
  const tokenPayload = {
    roomId: roomId,
  };
  const token = jwt.sign(tokenPayload, JWT_SECRET);
  console.log(token);

  return <EditorPage roomId={roomId} token={token} />;
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
