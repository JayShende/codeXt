// app/rooms/action-cell.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Trash2, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { RoomTable } from "./table.types";
import { toast } from "sonner";
import Link from "next/link";
import { useDeleteRoom } from "@/services/mutations";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function ActionCell({ room }: { room: RoomTable }) {
  const router = useRouter();
  const deleteMutation = useDeleteRoom();

  const handleDelete = async () => {
    const data = { roomId: room.id, roomSlug: room.roomSlug };
    await deleteMutation.mutateAsync(data);
    return;
  };

  return (
    <div className="flex items-center gap-2">
      <Button asChild size="sm" variant="outline">
        <Link
          href={`/${room.roomSlug}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink className="h-4 w-4" />
        </Link>
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              Room from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
