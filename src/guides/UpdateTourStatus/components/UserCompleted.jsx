export default function UserCompleted({ Icon, UserCheck, bgColor, text }) {
  return (
    <div
      className={`flex items-center gap-2 bg-${bgColor}-700 px-4 py-2 rounded-lg border text-white w-fit`}
    >
      <Icon className="h-5 w-5 text-white" />
      <span className="text-sm font-bold">
        {UserCheck && UserCheck} {text}
      </span>
    </div>
  );
}
