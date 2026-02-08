import "dotenv/config";
import { WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";

interface userProps {
  ws: WebSocket;
  room: string;
  userID?: string;
}

const PORT = Number(process.env.PORT);

const users: userProps[] = [];
const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (ws, req) => {
  console.log("Client Connected");
  users.push({
    ws: ws,
    room: "1234Test", // This is To Be Extrated From The Token in the Req URL
    // userID: "",
  });

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
          user.room == roomId &&
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
