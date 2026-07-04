export function Footer() {
  return (
    <footer className="border-t bg-white px-6 py-4 text-sm text-gray-600">
      <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
        <p>
          Built by <span className="font-medium text-gray-900">Lokesh Nimbalkar</span>
        </p>
        <div className="flex gap-4">
          
            <a href="https://github.com/lokeshnimbalkar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
          
            <a href="https://www.linkedin.com/in/lokesh-nimbalkar/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
