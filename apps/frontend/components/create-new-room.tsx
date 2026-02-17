"use client";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { useCreateRoom } from "@/services/mutations";
const CreateNewRoom = () => {
  const roomNameRef = useRef<HTMLInputElement>(null);
  const createRoomMuatation = useCreateRoom();
  const [open, setOpen] = useState(false);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // 🚨 REQUIRED

    const roomName = roomNameRef.current?.value || "";

    await createRoomMuatation.mutateAsync(roomName);

    setOpen(false);
    return;
  }

  return (
    <div className="flex w-full items-center justify-between px-1">
      <div>All Rooms</div>
      <div className="flex gap-x-3">
        <Button variant="outline" disabled>
          Filter
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus /> Create New Snippet
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-sm">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle className="mb-2">Create New Room</DialogTitle>

              </DialogHeader>
              <FieldGroup>
                <Field>
                  <Label htmlFor="room_name">Room Name (Optional)</Label>
                  <Input
                    id="room-name"
                    name="room_name"
                    placeholder="Hoola Hoop"
                    ref={roomNameRef}
                  />
                </Field>
              </FieldGroup>
              <DialogFooter className="mt-6">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Create Room</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CreateNewRoom;
