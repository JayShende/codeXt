"use client";
import Image from "next/image";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { LuBadgeCheck } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { MdLogout } from "react-icons/md";

import { Badge } from "@/components/ui/badge";
import { useLogOut } from "@/services/mutations";

interface UserAvatarProps {
  name: string;
  email: string;
  image?: string;
  initials?: string;
}

const UserAvatar = ({ name, email, image, initials }: UserAvatarProps) => {
  const logOutMutation = useLogOut();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="cursor-pointer">
          {image == undefined ? (
            <span className="text-secondary-700 flex size-10 items-center justify-center rounded-full bg-indigo-50 font-medium ring-2 ring-secondary">
              {initials}
            </span>
          ) : (
            <Image
              src={image}
              alt="profile-pic"
              width={40}
              height={40}
              className="h-8 w-8 rounded-full p-0.5 ring-2 ring-indigo-600 sm:h-9 sm:w-9"
            />
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="z-[100] mt-1 mr-2 w-fit border border-gray-200 bg-white shadow-lg"
        side="bottom"
        align="end"
      >
        <div className="flex flex-col gap-y-2">
          <div className="mx-2 flex items-center gap-x-2">
            <span className="text-xs font-normal text-gray-500">{name}</span>
            <Badge className="bg-primary text-secondary" variant="outline">
              <LuBadgeCheck /> Verified
            </Badge>
          </div>
          <div className="mx-2 flex gap-x-2 text-gray-500">
            <MdOutlineEmail className="text-secondary" />
            <span className="text-xs font-normal text-gray-500">{email}</span>
          </div>
          <div className="h-px w-full bg-gray-200"></div>
          <button
            onClick={() => logOutMutation.mutate()}
            disabled={logOutMutation.isPending}
            className="flex cursor-pointer items-center gap-x-2 rounded-lg border border-gray-300 px-4 py-2 text-xs text-gray-600 transition hover:bg-indigo-50 hover:text-indigo-600"
          >
            <MdLogout className="text-secondary" size={16} />
            Logout
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserAvatar;
