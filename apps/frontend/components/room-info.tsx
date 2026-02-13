import { useGetRoomDetails } from "@/services/queries";
import { toast } from "sonner";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { BadgeCheck, Info, Mail, SquareTerminal } from "lucide-react";

const RoomInfo = ({ roomSlug }: { roomSlug: string }) => {
  const roomDetailsQuery = useGetRoomDetails(roomSlug);

  if (roomDetailsQuery.isPending) return <Spinner />;

  if (roomDetailsQuery.isError) {
    toast.error("Error Fetching Room Data");
    return <></>;
  }
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Info className="text-muted-foreground/70 hover:text-muted-foreground h-4 w-4" />
      </HoverCardTrigger>
      <HoverCardContent className="w-fit">
        <div className="flex flex-col p-0">
          <div className="flex items-center gap-x-2">
            <SquareTerminal className="text-muted-foreground w-4" />
            <span className="text-secondary text-xs">
              {roomDetailsQuery.data.name}
            </span>
          </div>
          <div className="flex items-center gap-x-2">
            <BadgeCheck className="text-muted-foreground w-4" />
            <span className="text-secondary text-xs">
              {roomDetailsQuery.data.owner.name}
            </span>
          </div>
          <div className="flex items-center gap-x-2">
            <Mail className="text-muted-foreground w-4" />
            <span className="text-secondary text-xs">
              {roomDetailsQuery.data.owner.email}
            </span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default RoomInfo;

import { LoaderIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}
