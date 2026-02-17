import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableSkeletonProps {
  columns?: number;
  rows?: number;
}

export function TableSkeleton({ columns = 5, rows = 6 }: TableSkeletonProps) {
  return (
    <div className="relative w-full overflow-auto rounded-md border my-8 ">
      <Table>
        {/* Header */}
        <TableHeader>
          <TableRow className="h-6">
            {Array.from({ length: columns }).map((_, i) => (
              <TableHead key={i} className="bg-muted text-center">
                <Skeleton className="mx-auto h-6 w-24" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody>
          {Array.from({ length: rows }).map((_, r) => (
            <TableRow key={r}>
              {Array.from({ length: columns }).map((_, c) => (
                <TableCell key={c} className="py-4 border-r last:border-r-0">
                  <Skeleton className="h-5 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}