import type { ReactNode } from "react";

type SidebarProps = {
  children?: ReactNode;
};

export const Sidebar = ({ children }: SidebarProps) => {
  return (
    <aside className="h-full hidden sm:block w-64 shrink-0 overflow-hidden border-r border-slate-800 bg-slate-900 p-4">
      {children}
    </aside>
  );
};
