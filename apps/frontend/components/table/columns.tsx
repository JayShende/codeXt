// app/rooms/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { RoomTable } from "./table.types";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { Button } from "../ui/button";
import { ExternalLink, Trash2 } from "lucide-react";
import { ActionCell } from "./action-cell";

const formatDate = (date: Date | undefined) => {
  if (!date || isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

export const columns: ColumnDef<RoomTable>[] = [
  {
    accessorKey: "name",
    header: "Room Name",
    cell: ({ row }) => {
      const name = row.getValue<string>("name");
      return name ? (
        name
      ) : (
        <span className="text-muted-foreground italic">Untitled</span>
      );
    },
  },
{
  accessorKey: "roomSlug",
  header: "Slug",
  cell: ({ row }) => (
    <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 font-mono text-xs">
      {row.original.roomSlug}
    </span>
  ),
},

  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue<Date>("createdAt");
      return formatDate(date);
    },
  },
  {
    accessorKey: "snippetUpdatedAt",
    header: "Updated",
    cell: ({ row }) => {
      const date = row.getValue<Date>("snippetUpdatedAt");
      return formatDate(date);
    },
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const expiresAt = row.original.expiresAt as Date;
      const isExpired = expiresAt < new Date();

      return isExpired ? (
        <Badge className="border border-red-500/20 bg-red-500/10 text-red-600">
          Expired
        </Badge>
      ) : (
        <Badge className="border border-green-500/20 bg-green-500/10 text-green-600">
          Active
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionCell room={row.original} />,
  },
];
