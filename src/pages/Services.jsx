import {
  ArrowUpRight,
  Clock3,
  CreditCard,
  Mail,
  Map,
  MessageCircle,
  Phone,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

const WHATSAPP_NUMBER = "6283137007393";
const SUPPORT_EMAIL = "support@natours.com";

const helpCategories = [
  {
    icon: CreditCard,
    title: "Booking & Pembayaran",
    description: "Bantuan untuk proses pemesanan dan pembayaran tur.",
    message:
      "Halo, saya ingin bertanya soal proses booking dan pembayaran tur.",
  },
  {
    icon: RotateCcw,
    title: "Pembatalan & Refund",
    description: "Cari tahu proses pembatalan dan status pengembalian dana.",
    message:
      "Halo, saya ingin menanyakan pembatalan atau status refund tur saya.",
  },
  {
    icon: Map,
    title: "Info Tour & Itinerary",
    description: "Dapatkan detail tur yang sedang atau akan Anda ikuti.",
    message:
      "Halo, saya ingin bertanya soal detail tur yang sedang/akan saya ikuti.",
  },
  {
    icon: MessageCircle,
    title: "Keluhan & Masukan",
    description: "Sampaikan pengalaman dan masukan Anda untuk Natours.",
    message:
      "Halo, saya ingin menyampaikan keluhan/masukan untuk layanan Natours.",
  },
];

const contactItems = [
  {
    icon: Phone,
    title: "Nomor WhatsApp",
    description: "0859-5857-272",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
  },
  {
    icon: Mail,
    title: "Email Support",
    description: SUPPORT_EMAIL,
    href: `mailto:${SUPPORT_EMAIL}`,
  },
  {
    icon: Clock3,
    title: "Jam Operasional",
    description: "Setiap hari, 08.00 - 20.00 WIB",
  },
  {
    icon: ShieldCheck,
    title: "Kebijakan Pembatalan",
    description: "Refund penuh jika dibatalkan H-3 sebelum keberangkatan",
  },
];

function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function Services() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-20 pt-16 sm:px-10 lg:px-12">
      <section className="border-b border-neutral-100 pb-16 sm:pb-20">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-neutral-400">
          Bantuan
        </p>
        <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-6xl">
          Butuh Bantuan?
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-500 sm:text-lg">
          Pilih topik yang ingin Anda tanyakan. Tim Natours siap membantu
          perjalanan Anda berjalan lebih lancar.
        </p>
      </section>

      <section className="border-b border-neutral-100 py-16 sm:py-20">
        <div className="mb-10">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-neutral-400">
            Pilih topik
          </p>
          <h2 className="text-2xl font-bold leading-snug text-neutral-950 sm:text-3xl">
            Kami siap membantu
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {helpCategories.map((category) => {
            const Icon = category.icon;

            return (
              <article
                key={category.title}
                className="group flex min-h-80 flex-col rounded-2xl border border-neutral-200 p-6 "
              >
                <div className="mb-10 flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 text-neutral-900">
                  <Icon size={20} strokeWidth={1.6} />
                </div>
                <h3 className="text-lg font-semibold text-neutral-950">
                  {category.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                  {category.description}
                </p>
                <a
                  href={whatsappLink(category.message)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-neutral-300 px-3.5 py-2 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-500 hover:text-neutral-500"
                >
                  Chat via WhatsApp
                  <ArrowUpRight size={16} strokeWidth={1.8} />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mb-10">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-neutral-400">
            Informasi penting
          </p>
          <h2 className="text-2xl font-bold leading-snug text-neutral-950 sm:text-3xl">
            Hubungi Kami
          </h2>
        </div>

        <div className="grid max-w-3xl grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
          {contactItems.map((item) => {
            const Icon = item.icon;
            const content = (
              <>
                <div className="mt-0.5 text-neutral-700">
                  <Icon size={19} strokeWidth={1.6} />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-950">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-500">
                    {item.description}
                  </p>
                </div>
              </>
            );

            return item.href ? (
              <a key={item.title} href={item.href} className="group flex gap-4">
                {content}
              </a>
            ) : (
              <div key={item.title} className="flex gap-4">
                {content}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
