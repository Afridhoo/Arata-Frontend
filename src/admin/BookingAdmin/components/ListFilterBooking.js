const listFilterBooking = {
  statusBooking: [
    { text: "Pending", value: "pending-1", check: "status" },
    { text: "Konfirmasi", value: "confirmed-1", check: "status" },
    { text: "OnGoing", value: "onGoing-1", check: "status" },
    { text: "Selesai", value: "finished-1", check: "status" },
  ],

  date: [
    { text: "Tanggal Terbaru", value: "date-1", check: "date" },
    { text: "Tanggal Terlama", value: "date+1", check: "date" },
  ],
  totals: [
    {
      text: "Total Biaya Terbesar",
      value: "totals-1",
      check: "totals",
    },
    {
      text: "Total Biaya Terkecil",
      value: "totals+1",
      check: "totals",
    },
  ],
  group: [
    {
      text: "Group Terbanyak",
      value: "group-1",
      check: "group",
    },
    {
      text: " Group Terdikit",
      value: "group+1",
      check: "group",
    },
  ],
};

export const { statusBooking, date, totals, group } = listFilterBooking;
