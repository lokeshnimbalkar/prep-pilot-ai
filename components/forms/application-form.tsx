"use client";

import type { ApplicationInput } from "@/lib/validations";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createApplication, updateApplication } from "@/actions/applications";

type Props = {
  application?: {
    id: string;
    companyName: string;
    role: string;
    status: string;
    interviewDate: Date | null;
    notes: string | null;
  };
};

export function ApplicationForm({ application }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<ApplicationInput>({
    companyName: application?.companyName ?? "",
    role: application?.role ?? "",
    status: (application?.status as ApplicationInput["status"]) ?? "APPLIED",
    interviewDate: application?.interviewDate
      ? new Date(application.interviewDate).toISOString().slice(0, 10)
      : "",
    notes: application?.notes ?? "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        if (application) {
          await updateApplication(application.id, form);
        } else {
          await createApplication(form);
        }
        router.push("/dashboard");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      {error && (
        <p className="rounded-md bg-red-50 p-2 text-sm text-red-600">{error}</p>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium">Company Name</label>
        <input
          required
          maxLength={100}
          value={form.companyName}
          onChange={(e) => setForm({ ...form, companyName: e.target.value })}
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Role</label>
        <input
          required
          maxLength={100}
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Status</label>
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="APPLIED">Applied</option>
          <option value="INTERVIEWING">Interviewing</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Interview Date (optional)
        </label>
        <input
          type="date"
          value={form.interviewDate ?? ""}
          onChange={(e) => setForm({ ...form, interviewDate: e.target.value })}
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Notes (optional)</label>
        <textarea
          maxLength={2000}
          value={form.notes ?? ""}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          rows={4}
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
      >
        {isPending ? "Saving..." : application ? "Update" : "Add Application"}
      </button>
    </form>
  );
}