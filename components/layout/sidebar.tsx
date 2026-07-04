import Link from "next/link";
import { LayoutDashboard, Plus } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r bg-white md:flex md:flex-col">
      <div className="border-b p-6">
        <h1 className="text-xl font-bold">PrepPilot AI</h1>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
        >
          <LayoutDashboard className="h-4 w-4" />
          Applications
        </Link>
        <Link
          href="/dashboard/applications/new"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
        >
          <Plus className="h-4 w-4" />
          Add Application
        </Link>
      </nav>
    </aside>
  );
}