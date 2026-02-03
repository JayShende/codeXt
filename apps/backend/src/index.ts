import "dotenv/config";
import { prisma } from "@repo/database";

async function test() {
  const user = await prisma.user.findFirst();
  console.log(user);
}

test();
