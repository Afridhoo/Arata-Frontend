export default function FormLayout({
  User,
  onSubmit,
  Form,
  Icon,
  hiddenPassword,
  handleHidden,
  IconHidden,
  password = false,
  title,
  desc
}) {
  return (
    <div className="mb-6 max-h-[550px] overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <div className="flex items-center gap-3 border-b border-neutral-100 px-6 py-5 sm:px-7">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-700">
          <Icon className="text-base" />
        </span>
        <div>
          <h2 className="text-sm font-bold text-neutral-900">{title || "Informasi Akun"}</h2>
          <p className="text-xs text-neutral-400">{desc || "Nama dan email akun Anda"}</p>
        </div>

        {password && (
          <span
            onClick={handleHidden}
            className="ml-auto cursor-pointer rounded-xl border border-neutral-200 p-2 text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900"
          >
            <IconHidden className="text-base" />
          </span>
        )}
      </div>

      <Form User={User} onSubmit={onSubmit} hiddenPassword={hiddenPassword} />
    </div>
  );
}
