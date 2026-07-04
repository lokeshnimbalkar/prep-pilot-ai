import Link from "next/link";
import type { Application } from "@prisma/client";
import { getApplications } from "@/actions/applications";
import { DeleteButton } from "@/components/dashboard/delete-button";

const statusColors: Record<string, string> = {
  APPLIED: "bg-blue-100 text-blue-700",
  INTERVIEWING: "bg-yellow-100 text-yellow-700",
  OFFER: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

export default async function DashboardPage() {
  const applications = await getApplications();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Applications</h1>
        <Link
          href="/dashboard/applications/new"
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          + Add Application
        </Link>
      </div>

      {applications.length === 0 ? (
        <p className="text-gray-500">
          No applications yet. Add your first one to get started.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((app: Application) => (
            <div
              key={app.id}
              className="rounded-lg border bg-white p-4 shadow-sm"
            >
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <h2 className="font-semibold">{app.companyName}</h2>
                  <p className="text-sm text-gray-600">{app.role}</p>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${statusColors[app.status]}`}
                >
                  {app.status}
                </span>
              </div>
              {app.interviewDate && (
                <p className="mb-2 text-xs text-gray-500">
                  Interview: {new Date(app.interviewDate).toLocaleDateString()}
                </p>
              )}
              <div className="mt-3 flex gap-2 text-sm">
                <Link
                  href={`/dashboard/applications/${app.id}`}
                  className="text-blue-600 hover:underline"
                >
                  View / AI Prep
                </Link>
                <Link
                  href={`/dashboard/applications/${app.id}/edit`}
                  className="text-gray-600 hover:underline"
                >
                  Edit
                </Link>
                <DeleteButton id={app.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}