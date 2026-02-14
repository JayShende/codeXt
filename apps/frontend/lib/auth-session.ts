import { headers } from "next/headers";
export async function getAuthSession() {
  const EXPRESS_AUTH_URL = "http://localhost:3001/api/auth/get-session";
  const headersList = headers();
  // console.log("Inside the Function");
  // Extract raw cookie header
  const cookieHeader = (await headersList).get("cookie") || " ";
  // console.log("cookie", cookieHeader);
  let session = null;
  try {
    const authRes = await fetch(EXPRESS_AUTH_URL, {
      headers: {
        // Crucial: Pass the browser cookies to the backend
        cookie: cookieHeader,
      },
    });
    // console.log("authRes", authRes);
    if (authRes.ok) {
      session = await authRes.json();
      //   console.log("session in the function ",session);
      return session;
    }
  } catch (error) {
    console.error("Auth Backend Unreachable:", error);
  }
  return null;
}
