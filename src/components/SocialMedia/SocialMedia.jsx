import {
  BsTiktok,
  BsYoutube,
  BsFacebook,
  BsInstagram,
  BsTwitterX,
  BsWhatsapp,
  BsGeoAlt,
} from "react-icons/bs";

export const socialMedia = [
  {
    label: "TikTok",
    icon: <BsTiktok />,
    url: "https://www.tiktok.com/@arvi_afridho?lang=en-GB",
    use: ["JumboTron"],
  },
  {
    label: "YouTube",
    icon: <BsYoutube />,
    url: "https://www.youtube.com/",
    use: ["JumboTron"],
  },
  {
    label: "Facebook",
    icon: <BsFacebook />,
    url: "https://www.facebook.com/",
    use: [],
  },
  {
    label: "Instagram",
    icon: <BsInstagram />,
    url: "https://www.instagram.com/",
    use: ["JumboTron"],
  },
  {
    label: "X Twitter",
    icon: <BsTwitterX />,
    url: "https://x.com/",
    use: ["JumboTron"],
  },
  {
    label: "WhatsApp",
    icon: <BsWhatsapp />,
    url: "https://wa.me/6285709977699",
    use: [],
  },
  {
    label: "Lokasi Kantor",
    icon: <BsGeoAlt />,
    url: "https://maps.google.com/",
    use: [],
  },
];

export const socialMediaJumbotron = socialMedia?.filter((s) =>
  s.use.includes("JumboTron"),
);
