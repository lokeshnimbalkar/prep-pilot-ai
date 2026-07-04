import { getApplication } from "@/actions/applications";
import { InterviewPrep } from "@/components/dashboard/interview-prep";
import Link from "next/link";

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const application = await getApplication(id);

  return (
    <div className="max-w-2xl">
      <Link href="/dashboard" className="mb-4 inline-block text-sm text-blue-600 hover:underline">
        ← Back to applications
      </Link>

      <div className="mb-6 rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">{application.companyName}</h1>
        <p className="text-gray-600">{application.role}</p>
        <p className="mt-2 text-sm text-gray-500">Status: {application.status}</p>
        {application.interviewDate && (
          <p className="text-sm text-gray-500">
            Interview: {new Date(application.interviewDate).toLocaleDateString()}
          </p>
        )}
        {application.notes && (
          <p className="mt-3 text-sm text-gray-700">{application.notes}</p>
        )}
      </div>

      <InterviewPrep
        applicationId={application.id}
        existingQuestions={application.aiQuestions}
      />
    </div>
  );
}