import { useState } from "react";

import { Sidebar } from "@shared/layout/sidebar";
import { FlowBuilder } from "@features/FlowBuilder";

const pool = ["Inbox", "Drafts", "Sent", "Archive", "Alerts", "Reports", "Queue", "Logs"];

const randomMenu = () =>
  [...pool].sort(() => Math.random() - 0.5).slice(0, 5);

export const Console = () => {
  const [items] = useState(randomMenu);

  return (
    <div className="flex h-full w-full overflow-hidden">
      <Sidebar>
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-400">
          Menu
        </p>
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item}>
              <button
                type="button"
                className="w-full rounded-md px-3 py-2 text-left text-sm text-slate-200 hover:bg-slate-800"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </Sidebar>
      <div className="h-full min-w-0 flex-1 overflow-hidden">
        <FlowBuilder />
      </div>
    </div>
  );
};
