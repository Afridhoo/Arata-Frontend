import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TableBookingAdmin({
  valueTable,
  handleEdit,
  tableHead,
  handleDelete,
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableHead.map((el, idx) => (
            <TableHead key={idx}>{el}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {valueTable?.map((row, rowIdx) => {
          const { data, id } = row;

          return (
            <TableRow key={rowIdx}>
              {data?.map((e, i) => (
                <TableCell key={i} className={"max-w-[200px] truncate"}>
                  {e}
                </TableCell>
              ))}
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 cursor-pointer"
                      >
                        <MoreHorizontalIcon />
                      </Button>
                    }
                  />
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(id)}>
                      Edit
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
