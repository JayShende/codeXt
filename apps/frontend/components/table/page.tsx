"use client";

import { useGetAllUserRoomsData } from "@/services/queries";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Table, TableCell, TableRow } from "../ui/table";
import { TableSkeleton } from "../table-skeleton";

export default function TableCompoenet() {
  const getUserRoomData = useGetAllUserRoomsData();
  if (getUserRoomData.isPending) {
    return <TableSkeleton />;
  }
  if (getUserRoomData.isError) {
    return <div>Error........</div>;
  }
  console.log(getUserRoomData.data);
  return (
    <div className="container mx-auto ">
      <DataTable columns={columns} data={getUserRoomData.data.data} />
    </div>
  );
}
