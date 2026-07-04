"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { applicationSchema, type ApplicationInput } from "@/lib/validations";
import { revalidatePath } from "next/cache";

async function requireUser() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return session.user.id;
}

export async function getApplications() {
  const userId = await requireUser();
  return prisma.application.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getApplication(id: string) {
  const userId = await requireUser();
  const app = await prisma.application.findFirst({
    where: { id, userId },
  });
  if (!app) throw new Error("Not found");
  return app;
}

export async function createApplication(input: ApplicationInput) {
  const userId = await requireUser();
  const parsed = applicationSchema.parse(input);

  await prisma.application.create({
    data: {
      companyName: parsed.companyName,
      role: parsed.role,
      status: parsed.status,
      notes: parsed.notes || null,
      interviewDate: parsed.interviewDate
        ? new Date(parsed.interviewDate)
        : null,
      userId,
    },
  });

  revalidatePath("/dashboard");
}

export async function updateApplication(id: string, input: ApplicationInput) {
  const userId = await requireUser();
  const parsed = applicationSchema.parse(input);

  const existing = await prisma.application.findFirst({
    where: { id, userId },
  });
  if (!existing) throw new Error("Not found or unauthorized");

  await prisma.application.update({
    where: { id },
    data: {
      companyName: parsed.companyName,
      role: parsed.role,
      status: parsed.status,
      notes: parsed.notes || null,
      interviewDate: parsed.interviewDate
        ? new Date(parsed.interviewDate)
        : null,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/applications/${id}`);
}

export async function deleteApplication(id: string) {
  const userId = await requireUser();

  const existing = await prisma.application.findFirst({
    where: { id, userId },
  });
  if (!existing) throw new Error("Not found or unauthorized");

  await prisma.application.delete({ where: { id } });
  revalidatePath("/dashboard");
}