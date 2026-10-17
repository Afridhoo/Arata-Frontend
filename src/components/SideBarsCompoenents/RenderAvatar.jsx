import AvatarSimpleUse from "../AvatarSimpleUse";

export default function RenderAvatar({ photo }) {
  return (
    <div className="relative">
      {photo && <AvatarSimpleUse photo={photo} isActive={true} />}
    </div>
  );
}
