import { ReactNode } from "react";
import { Sidebar } from "./layout/sidebar";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <main className="flex-1 relative h-full overflow-y-auto overflow-x-hidden focus:outline-none">
        {children}
      </main>
    </div>
  );
}
