import "dotenv/config";
import { WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";

interface userProps {
  ws: WebSocket;
  roomId: string;
  userId?: string;
}

const PORT = Number(process.env.PORT);
const JWT_SECRET = process.env.WS_JWT_SECRET || "";

const users: userProps[] = [];
const wss = new WebSocketServer({ port: PORT });

function verifyToken(token: string) {
  let decoded: JwtPayload | undefined;
  try {
    decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (!decoded.roomId) {
      return;
    }
  } catch (error) {
    console.log("Error is ", error);
    return null;
  }

  if (!decoded.roomId) {
    return null;
  }
  return decoded.roomId;
}

wss.on("connection", (ws, req) => {
  console.log("Client Trying To Connect");

  const req_url = req.url; // should be Something like ws://localhost:3000?token=123123
  if (!req_url) {
    return;
  }
  const query_params = new URLSearchParams(req_url.split("?")[1]); // the above will split the req url into array aster the "?" as ["ws://localhost:3000","token=123123"]
  const token = query_params.get("token") || "";

  const roomId = verifyToken(token);
  if (roomId == null) {
    ws.close();
    return;
  }
  users.push({
    ws: ws,
    roomId: roomId, // This is To Be Extrated From The Token in the Req URL
    // userID: "",
  });
  console.log("New Client Conntected to Room-", roomId);

  ws.on("message", async (data) => {
    const parsedData = JSON.parse(data.toString());
    console.log("Some Incomgig msg");
    console.log(parsedData);
    if (parsedData.type == "chat") {
      const roomId = parsedData.roomId;
      const message = parsedData.message;
      users.forEach((user) => {
        // console.log("setp-1");
        // console.log("roomId", roomId);
        // console.log(user.room == roomId);

        if (
          user.roomId == roomId &&
          ws != user.ws &&
          user.ws.readyState === WebSocket.OPEN
        ) {
          // console.log("RoomId is Same");
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message: message,
              roomId,
            }),
          );
        }
      });
    }
  });
});

console.log(`WebSocket Server is Running on ws://localhost:${PORT}`);
