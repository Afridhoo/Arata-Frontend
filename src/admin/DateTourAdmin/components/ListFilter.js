const listFilter = {
  booking: [
    { text: "Booking Terbanyak", value: "booking-1", check: "booking" },
    { text: "Booking Terdikit", value: "booking+1", check: "booking" },
  ],

  date: [
    { text: "Tanggal Terjauh", value: "date-1", check: "date" },
    { text: "Tanggal Terdekat", value: "date+1", check: "date" },
    {
      text: "Tanggal Belum Ditambahkan",
      value: "dateNotExist",
      check: "date",
    },
  ],

  guideReady: [
    {
      text: "Pemandu Ready Terbanyak",
      value: "guideReady-1",
      check: "guideReady",
    },
    {
      text: "Pemandu Ready Terdikit",
      value: "guideReady+1",
      check: "guideReady",
    },
  ],
  guideAssigned: [
    {
      text: "Pemandu Ditambahkan Terbanyak",
      value: "guideAssigned-1",
      check: "guideAssigned",
    },
    {
      text: "Pemandu Ditambahkan Terdikit",
      value: "guideAssigned+1",
      check: "guideAssigned",
    },
  ],
};

export const { booking, guideAssigned, guideReady, date } = listFilter;
