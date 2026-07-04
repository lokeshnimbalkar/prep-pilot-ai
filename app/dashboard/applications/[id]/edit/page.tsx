import { getApplication } from "@/actions/applications";
import { ApplicationForm } from "@/components/forms/application-form";

export default async function EditApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const application = await getApplication(id);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Edit Application</h1>
      <ApplicationForm application={application} />
    </div>
  );
}