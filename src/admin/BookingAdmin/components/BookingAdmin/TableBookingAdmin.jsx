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
import { DialogSimpleUse } from "@/components/DialogSimpleUse";

export default function TableBookingAdmin({
  valueTable,
  handleEdit,
  tableHead,
  handleDelete,
  deleteType,
}) {
  const messageDelete = {
    tour: {
      title: "Apakah Anda Yakin Ingin Menghapus (Soft) Tour Ini ? ",
      desc: "Jika Ada User Yang Booking Maka Penghapusan Tour Hanya Akan Mengubah Status Menjadi Sold Out , Jika Tidak Maka Akan Dinonaktifkan",
    },
  };

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
                    <DropdownMenuItem
                      className={"cursor-pointer"}
                      onClick={() => handleEdit(id)}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {handleDelete && deleteType && (
                      <DialogSimpleUse
                        textSubmit={"Lanjut Hapus"}
                        btnText={"Hapus"}
                        variant={"ghost"}
                        style={"w-full  justify-start"}
                        title={messageDelete[deleteType]?.title || ""}
                        desc={messageDelete[deleteType]?.desc || ""}
                        onSucsess={() => handleDelete(id)}
                      />
                    )}
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
