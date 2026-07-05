import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <h1 className="text-4xl font-bold">PrepPilot AI</h1>
      <p className="mt-4 max-w-md text-gray-600">
        Track your job applications and get AI-generated interview questions
        tailored to each role and company.
      </p>
      <Link
        href="/login"
        className="mt-8 rounded-md bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
      >
        Get Started
      </Link>

      <footer className="mt-16 text-sm text-gray-500">
        Built by <span className="font-medium text-gray-900">Lokesh Nimbalkar</span>
        {" · "}
        
        <a  href="https://github.com/lokeshnimbalkar"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          GitHub
        </a>
        {" · "}
        
        <a  href="https://www.linkedin.com/in/lokesh-nimbalkar/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          LinkedIn
        </a>
      </footer>
    </div>
  );
}