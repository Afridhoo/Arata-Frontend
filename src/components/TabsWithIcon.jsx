import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsWithIcon({ tabs = [], onClickTabs }) {
  const getDefault = tabs.find((s) => s.default)?.value;

  return (
    <Tabs defaultValue={getDefault || ""}>
      <TabsList>
        {tabs?.map((x) => (
          <TabsTrigger
            className={"cursor-pointer"}
            value={x.value}
            onClick={() => onClickTabs(x.value)}
          >
            {x?.icon}
            {x.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
