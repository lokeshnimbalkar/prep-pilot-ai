"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateInterviewQuestions(applicationId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const application = await prisma.application.findFirst({
    where: { id: applicationId, userId: session.user.id },
  });
  if (!application) throw new Error("Not found or unauthorized");

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `You are a senior technical interviewer. Generate 6 realistic interview questions for a candidate interviewing for the role of "${application.role}" at "${application.companyName}".

Include a mix of:
- 2 behavioral/situational questions
- 2 role-specific technical questions
- 2 questions about the candidate's fit for this specific company

Format your response as a numbered list, one question per line, with no extra commentary, headers, or markdown formatting beyond the numbers.`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  await prisma.application.update({
    where: { id: applicationId },
    data: { aiQuestions: text },
  });

  return text;
}