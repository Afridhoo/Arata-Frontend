import { Button } from "@/components/ui/button";

export default function TabsLocation({ setTabs, tabs }) {
  const tab = ["destination", "hotel"];

  return (
    <div className="px-3 py-3 pt-4 flex gap-4 border-b border-gray-100 bg-teal-50/80">
      {tab.map((el, idx) => (
        <Button
          onClick={() => setTabs(el)}
          type="button"
          key={idx}
          className={"tracking-wider"}
          variant={tabs === el ? "default" : "outline"}
          size="sm"
        >
          {el?.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}
