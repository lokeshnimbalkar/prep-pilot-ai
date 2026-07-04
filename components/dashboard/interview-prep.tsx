"use client";

import { useState, useTransition } from "react";
import { generateInterviewQuestions } from "@/actions/ai";

export function InterviewPrep({
  applicationId,
  existingQuestions,
}: {
  applicationId: string;
  existingQuestions: string | null;
}) {
  const [questions, setQuestions] = useState(existingQuestions);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleGenerate() {
    setError(null);
    startTransition(async () => {
      try {
        const result = await generateInterviewQuestions(applicationId);
        setQuestions(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to generate questions"
        );
      }
    });
  }

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">AI Interview Prep</h2>
        <button
          onClick={handleGenerate}
          disabled={isPending}
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {isPending
            ? "Generating..."
            : questions
              ? "Regenerate Questions"
              : "Generate Questions"}
        </button>
      </div>

      {error && (
        <p className="mb-3 rounded-md bg-red-50 p-2 text-sm text-red-600">
          {error}
        </p>
      )}

      {questions ? (
        <ol className="list-decimal space-y-2 pl-5 text-sm text-gray-700">
          {questions
            .split("\n")
            .filter((line) => line.trim())
            .map((line, i) => (
              <li key={i}>{line.replace(/^\d+[.)]\s*/, "")}</li>
            ))}
        </ol>
      ) : (
        <p className="text-sm text-gray-500">
          Generate tailored interview questions based on this role and company.
        </p>
      )}
    </div>
  );
}