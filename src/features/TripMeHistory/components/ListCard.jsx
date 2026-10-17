export default function ListCard({ title, value, title2, value2 }) {
  return (
    <div className="flex items-center gap-10">
      <span>
        <p className="text-[#6e6e73]">{title}</p>
        <p className="mt-1 font-medium">{value} </p>
      </span>
      <span>
        <p className="text-[#6e6e73]">{title2}</p>
        <p className="mt-1 font-medium">{value2} </p>
      </span>
    </div>
  );
}
