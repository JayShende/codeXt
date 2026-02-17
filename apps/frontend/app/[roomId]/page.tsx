import MainPage from "@/components/main-page";
import { getAuthSession } from "@/lib/auth-session";
import { prisma } from "@repo/database";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { toast } from "sonner";
export default async function Page({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;
  const response = await checkRoomId(roomId);
  if (!response) {
    return (
      <div className="text-xl font-bold text-red-400">
        The Slug {roomId} Dont Exist in Db
      </div>
    );
  }
  // getAuthSession();
  const JWT_SECRET = process.env.WS_JWT_SECRET || "";

  // Generate the Token
  const tokenPayload = {
    roomId: roomId,
  };
  const token = jwt.sign(tokenPayload, JWT_SECRET);

  let initialCode: string | undefined = "";
  let initialLanguage: string | undefined = "";
  let initialTheme: string | undefined = "";
  let initialFontSize: number | undefined = 14;
  try {
    const room = await prisma.room.findFirst({
      where: {
        roomSlug: roomId,
      },
    });
    if (room?.expiresAt! < new Date()) {
      throw new Error("Room expired");
    }
    const snippet = await prisma.snippet.findFirst({
      where: {
        roomId: room?.id,
      },
    });
    // console.log(snippet);
    initialCode = snippet?.code || " ";
    initialLanguage = snippet?.language || " ";
    initialFontSize = snippet?.fontSize || 14;
    initialTheme = snippet?.theme || "vs-dark";
    return (
      <MainPage
        initialCode={initialCode}
        roomSlug={roomId}
        token={token}
        initialLanguage={initialLanguage}
        initialTheme={initialTheme}
        initialFontSize={initialFontSize}
      />
    );
  } catch (error) {
    if (error instanceof Error && error.message === "Room expired") {
      return <div>Room Expired</div>;
    }
    console.log("Error in Db Query", error);
  }
  return <div>Error</div>;
}

async function checkRoomId(roomId: string) {
  try {
    const check = await prisma.room.findUnique({
      where: {
        roomSlug: roomId,
      },
    });
    if (check == null) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("Some Error in Making the DB Call", error);
    return false;
  }
}
