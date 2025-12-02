import { LogList } from "@/components/sections/log/LogList";
import { getLogEntries } from "@/lib/log";

export default async function LogPage() {
  const entries = await getLogEntries();

  return <LogList entries={entries} />;
}
