import Generate from "~/domain/generate";
import MaintenanceMode from "./maintenance-mode";

const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

export default function Page() {
  return (
    <main className="grid content-start gap-y-4 justify-center min-h-[100svh] items-center p-6 lg:p-16 h-full bg-zinc-100 dark:bg-zinc-950 smooth">
      {isMaintenance ? <MaintenanceMode /> : <Generate />}
    </main>
  );
}
