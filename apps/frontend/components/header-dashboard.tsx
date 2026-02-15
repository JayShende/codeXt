import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import React from "react";
import { sessionObjectProps } from "./nav-user";
import UserAvatar from "./ui/user-avatar";

const HeaderDashboard = () => {
  const authSession: sessionObjectProps = useAppSelector(
    (state) => state.authSession
  );
  console.log("Here Inside", authSession);
  if (authSession == null) {
    return (
      <div className="flex h-10 w-full items-center justify-center bg-emerald-100 text-sm text-red-500">
        No active authSession
      </div>
    );
  }
  const { name, image, email } = authSession.user!;

  if (name == null || name == undefined) {
    return;
  }
  if (email == null || email == undefined) {
    return;
  }

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "NA";
  if (initials == null || initials == undefined) {
    return;
  }
  return (
    <div className="bg-card sticky top-0 z-10 flex items-center justify-between rounded-2xl px-5 py-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className="text-secondary-700 text-lg font-bold">Hello 👋 {name}</div>
      <div>
        <UserAvatar
          name={name}
          image={image}
          email={email}
          initials={initials}
        />
      </div>
    </div>
  );
};

export default HeaderDashboard;
